import { useDeleteProduct } from '@/services/product/queries/useDeleteProduct'
import { useGetProduct } from '@/services/product/queries/useGetProduct'
import { useAddWishList } from '@/services/wishList/queries/useAddWishList'
import { useGetWishList } from '@/services/wishList/queries/useGetWishList'
import { useUpdateWishList } from '@/services/wishList/queries/useUpdateWishList'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import OneButtonModal from '../components/OneButtonModal'
import { getUserRole } from '../utils/getUserRole'

const ProductDetail = () => {
  const { data: wishList = [] } = useGetWishList() // 장바구니 상품 조회
  const { productId } = useParams<{ productId: string }>()
  const { data, isError } = useGetProduct(Number(productId))
  const [mainImage, setMainImage] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const deleteProductMutate = useDeleteProduct()
  const addWishListMutate = useAddWishList()
  const updateWishListMutate = useUpdateWishList()
  const nav = useNavigate()

  useEffect(() => {
    if (!data) return

    if (Array.isArray(data.imgUrl) && data.imgUrl.length > 0) {
      setMainImage(data.imgUrl[0])
    } else {
      setMainImage(data.imgUrl)
    }

    const role = getUserRole()

    if (role === 'ADMIN') {
      setIsAdmin(true)
    }
  }, [data])

  if (isError) {
    return (
      <div className='mx-auto flex min-h-[600px] w-[1050px] items-center justify-center'>
        상품을 불러 올 수 없습니다.
      </div>
    )
  }

  const imageList = Array.isArray(data?.imgUrl) ? data.imgUrl : [data?.imgUrl]
  const totalPrice = (data?.price ?? 0) * quantity // 총가격

  // 수량 증가 감소
  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setQuantity((prev) => {
      if (type === 'increase') return prev + 1
      return prev > 1 ? prev - 1 : 1
    })
  }

  // 모달창 닫기
  const closeModal = () => {
    setShowModal(false)
    nav('/products')
  }

  // 상품 삭제
  const deleteProductBtn = async () => {
    deleteProductMutate.mutate(
      { productId: Number(productId) },
      {
        onSuccess: (data) => {
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
    const existingItem = wishList.find(
      (item) => item.productId === Number(productId)
    )

    if (existingItem) {
      // 이미 장바구니에 있음 → 수량 추가
      const newQuantity = existingItem.quantity + quantity
      updateWishListMutate.mutate(
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
      addWishListMutate.mutate(
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

  return (
    <div className='mx-auto flex w-[1050px] gap-12 py-20'>
      {/* 왼쪽 상품 정보 */}
      <div className='w-[450px]'>
        <div className='mb-3 overflow-hidden rounded-lg border'>
          {mainImage && (
            <img
              src={mainImage}
              alt='대표 이미지'
              className='h-[450px] w-full'
            />
          )}
        </div>

        <div className='flex justify-center gap-2'>
          {imageList.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`img-${idx}`}
              onMouseEnter={() => setMainImage(img)}
              className='h-20 w-20 cursor-pointer rounded-md border object-cover hover:border-blue-500'
            />
          ))}
        </div>
      </div>

      {/* 오른쪽 상품 정보 */}
      <div className='flex-1'>
        <div className='flex h-full flex-col justify-between'>
          <div>
            <h1 className='mb-3 text-2xl font-bold'>{data?.name}</h1>
            <p className='mb-6 text-2xl font-bold text-red-600'>
              {data?.price.toLocaleString()}원
            </p>

            <div className='mb-6 rounded-md bg-gray-50 p-4'>
              <div className='mb-2 font-medium'>{data?.name}</div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center rounded-md border'>
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    className='px-3 py-1 text-lg'
                  >
                    −
                  </button>
                  <div className='w-10 text-center'>{quantity}</div>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className='px-3 py-1 text-lg'
                  >
                    +
                  </button>
                </div>
                <div className='text-lg font-bold'>
                  {totalPrice.toLocaleString()}원
                </div>
              </div>
            </div>

            <div className='mb-6 text-xl font-bold'>
              총 상품금액{' '}
              <span className='text-red-600'>
                {totalPrice.toLocaleString()}원
              </span>
            </div>

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
                to={`/createProduct?productId=${data?.productId}`}
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
  )
}

export default ProductDetail
