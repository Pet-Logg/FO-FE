import { Button } from '@/components/common/Button'
import { OneButtonModal } from '@/components/common/OneButtonModal'
import { Content } from '@/components/product'
import { ProductImg } from '@/components/product/ProductImage'
import { useAddCart, useGetCart, useUpdateCart } from '@/services/cart'
import { useDeleteProduct, useGetProduct } from '@/services/product'
import { useProductDetail } from '@/services/product/hooks'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export const ProductDetail = () => {
  const nav = useNavigate()
  const { data: cart = [] } = useGetCart() // 장바구니 상품 조회
  const { productId } = useParams<{ productId: string }>()
  const { data, isError } = useGetProduct(Number(productId))
  const { mainImage, setMainImage, quantity, isAdmin, handleQuantityChange } =
    useProductDetail(data)
  const [showModal, setShowModal] = useState(false)
  const deleteProductMutate = useDeleteProduct()
  const addCartMutate = useAddCart()
  const updateCartMutate = useUpdateCart()

  // 모달창 닫기
  const closeModal = () => {
    setShowModal(false)
    nav('/products')
  }

  // 상품 삭제
  const deleteProductBtn = () => {
    deleteProductMutate.mutate(
      { productId: Number(productId) },
      {
        onSuccess: () => {
          console.log('상품이 성공적으로 삭제되었습니다.')
          setShowModal(true)
        },
        onError: (err) => {
          console.log(err)
          alert('상품삭제 중 에러가 발생했습니다.')
        }
      }
    )
  }

  // 장바구니에 추가
  const handleAddToCart = () => {
    const existingItem = cart.find(
      (item) => item.productId === Number(productId)
    )

    if (existingItem) {
      // 이미 장바구니에 있음 → 수량 추가
      const newQuantity = existingItem.quantity + quantity
      updateCartMutate.mutate(
        {
          productId: Number(productId),
          quantity: newQuantity
        },
        {
          onSuccess: () => {
            console.log('장바구니 수량이 증가되었습니다.')
          },
          onError: () => {
            console.log('장바구니 수량 증가에 실패했습니다.')
          }
        }
      )
    } else {
      // 장바구니에 없으면 새로 생성
      addCartMutate.mutate(
        {
          productId: Number(productId),
          quantity
        },
        {
          onSuccess: () => {
            console.log('장바구니 담기에 성공했습니다.')
          },
          onError: () => {
            console.log('장바구니 담기에 실패했습니다.')
          }
        }
      )
    }
  }

  if (isError) {
    return (
      <div className='mx-auto flex min-h-[600px] w-[1050px] items-center justify-center'>
        상품을 불러 올 수 없습니다.
      </div>
    )
  }

  return (
    <>
      {data && (
        <div className='mx-auto flex min-h-[800px] w-[1050px] gap-12 py-20'>
          <ProductImg
            mainImage={mainImage}
            // imageList={imageList}
            imgUrl={data.imgUrl}
            onMouseEnterEvt={setMainImage}
          />

          {/* 오른쪽 상품 정보 */}
          <div className='flex-1'>
            <div className='flex h-full flex-col justify-between'>
              <div>
                <Content
                  name={data.name}
                  price={data.price}
                  quantity={quantity}
                  handleQuantityChange={handleQuantityChange}
                />

                <div className='flex gap-4'>
                  <button
                    onClick={handleAddToCart}
                    className='flex-1 rounded-full border border-gray-300 py-3 hover:bg-gray-100'
                  >
                    장바구니 담기
                  </button>
                  <button className='flex-1 rounded-full bg-red-500 py-3 text-white hover:bg-red-600'>
                    바로 구매하기
                  </button>
                </div>
              </div>

              {isAdmin && (
                <div className='flex justify-end gap-4'>
                  <Link
                    to={`/createProduct?productId=${data.productId}`}
                    state={{ mode: 'edit' }}
                  >
                    <Button text={'수정'} type={'normal'} onClick={() => {}} />
                  </Link>
                  <Button
                    text={'삭제'}
                    type={'delete'}
                    onClick={deleteProductBtn}
                  />
                </div>
              )}
            </div>

            {showModal && (
              <OneButtonModal
                text='상품 삭제 완료'
                buttonName='확인'
                buttonType='normal'
                onConfirm={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
