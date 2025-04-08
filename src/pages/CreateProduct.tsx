import { OneButtonModal } from '@/components/common/OneButtonModal'
import { ImgUpload } from '@/components/product/ImgUpload'
import { ProductInput } from '@/components/product/ProductInput'
import {
  useCreateProduct,
  useGetProduct,
  useUpdateProduct
} from '@/services/product'
import { useProductForm } from '@/services/product/hooks/useProductForm'
import { message } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export const CreateProduct: React.FC = () => {
  const nav = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const paramProductId = searchParams.get('productId')
  const mode = location.state?.mode || 'create'

  const [showModal, setShowModal] = useState(false)

  const createProductMutate = useCreateProduct()
  const updateProductMutate = useUpdateProduct()
  const { data } = useGetProduct(Number(paramProductId))

  const {
    productData,
    setProductData,
    fileList,
    setFileList,
    handleInputChange,
    handleImageUpload
  } = useProductForm(data)

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false)
    nav('/products')
  }

  // 제출하기
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (productData.name === '' || !productData.name) {
      message.error('상품명을 입력해주세요.')
      return
    }

    if (productData.price === 0 || !productData.name) {
      message.error('상품 가격을 입력해주세요.')
      return
    }

    if (productData.quantity === 0 || !productData.quantity) {
      message.error('상품 수량을 입력해주세요.')
      return
    }

    if (productData.productImg.length === 0) {
      message.error('상품 이미지를 최소 1개 이상 선택하세요.')
      return
    }

    const formData = new FormData()

    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'productImg') return

      formData.append(key, value ?? '')
    })

    const originalImageUrls = fileList
      .filter((file) => !file.originFileObj) // 기존 이미지, file.originFileObj = Ant 라이브러리의 Upload 컴포넌트가 생성한 업로드된 파일의 실제 File 객체
      .map((file) => file.url!) // string[]

    // 새 이미지만 업로드
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append('productImg', file.originFileObj)
      }
    })

    // 기존 이미지 URL을 함께 전송 (imgUrls로)
    originalImageUrls.forEach((url) => {
      formData.append('imgUrl', url)
    })

    // 기존 이미지 S3 key 보내기
    const keepKeys = fileList
      .filter((file) => !file.originFileObj)
      .map((file) => file.key!) // 기존 이미지의 key만

    keepKeys.forEach((key) => {
      formData.append('S3Key', key)
    })

    // product 수정 API
    if (mode === 'edit' && paramProductId) {
      updateProductMutate.mutate(
        { productId: Number(paramProductId), formData: formData },
        {
          onSuccess: (data) => {
            console.log('반려동물 수정 성공!', data)
            setShowModal(true)
          },
          onError: (err) => {
            console.log(err)
          }
        }
      )
      return
    }

    // product 생성 API
    createProductMutate.mutate(
      { formData: formData },
      {
        onSuccess: (data) => {
          setProductData({
            name: '',
            price: 0,
            quantity: 0,
            productImg: []
          })
          setFileList([])
          console.log('상품이 성공적으로 등록되었습니다!', data)
          setShowModal(true)
        },
        onError: (err) => {
          console.log('상품 등록에 실패했습니다', err)
        }
      }
    )
  }

  return (
    <div className='mx-auto w-[1050px]'>
      <div className='mx-auto my-20 w-1/2'>
        <h2 className='mb-10 text-2xl font-bold'>상품 등록</h2>
        <form onSubmit={handleSubmit}>
          {/* 상품명 */}
          <ProductInput
            label={'상품명'}
            name={'name'}
            value={productData.name}
            handleInputChange={handleInputChange}
          />

          {/* 가격 */}
          <ProductInput
            label={'가격 (원)'}
            name={'price'}
            type='number'
            value={productData.price}
            handleInputChange={handleInputChange}
          />

          {/* 수량 */}
          <ProductInput
            label={'수량 (개)'}
            name={'quantity'}
            type='number'
            value={productData.quantity}
            handleInputChange={handleInputChange}
          />

          {/* 이미지 올리기 */}
          <ImgUpload
            fileList={fileList}
            handleImageUpload={handleImageUpload}
          />

          <button
            type='submit'
            className='w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600'
          >
            상품 등록
          </button>
        </form>

        {showModal && (
          <OneButtonModal
            text='상품 등록 완료'
            buttonName='확인'
            buttonType='normal'
            onConfirm={closeModal}
          />
        )}
      </div>
    </div>
  )
}
