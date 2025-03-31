import { OneButtonModal } from '@/components/common/OneButtonModal'
import { useCreateProduct } from '@/services/product/queries/useCreateProduct'
import { useGetProduct } from '@/services/product/queries/useGetProduct'
import { useUpdateProduct } from '@/services/product/queries/useUpdateProduct'
import { CustomUploadFile } from '@/types/CustomUploadFile'
import { createProductData } from '@/types/ProductUploadData'
import { InboxOutlined } from '@ant-design/icons'
import { Upload, message } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const { Dragger } = Upload

export const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState<createProductData>({
    name: '',
    productImg: [],
    price: 0,
    quantity: 0
  })

  const createProductMutate = useCreateProduct()
  const updateProductMutate = useUpdateProduct()

  const location = useLocation()
  const [searchParams] = useSearchParams()
  const nav = useNavigate()

  const mode = location.state?.mode || 'create'
  const [showModal, setShowModal] = useState(false)
  const [fileList, setFileList] = useState<CustomUploadFile[]>([])
  const paramProductId = searchParams.get('productId')
  const { data } = useGetProduct(Number(paramProductId))

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // 파일(이미지) 올리기
  const onChangeFile = ({ fileList }: { fileList: CustomUploadFile[] }) => {
    if (fileList.length > 5) {
      message.error('최대 5개의 이미지만 업로드할 수 있습니다.')
      return
    }
    setFileList(fileList)
    setFormData((prev) => ({
      ...prev,
      productImg: fileList
    }))
  }

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false)
    nav('/products')
  }

  // 제출하기
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.name === '' || !formData.name) {
      message.error('상품명을 입력해주세요.')
      return
    }

    if (formData.price === 0 || !formData.name) {
      message.error('상품 가격을 입력해주세요.')
      return
    }

    if (formData.quantity === 0 || !formData.quantity) {
      message.error('상품 수량을 입력해주세요.')
      return
    }

    if (formData.productImg.length === 0) {
      message.error('상품 이미지를 최소 1개 이상 선택하세요.')
      return
    }

    const data = new FormData()
    data.append('name', formData.name)
    data.append('price', formData.price.toString())
    data.append('quantity', formData.quantity.toString())

    const originalImageUrls = fileList
      .filter((file) => !file.originFileObj) // 기존 이미지, file.originFileObj = Ant 라이브러리의 Upload 컴포넌트가 생성한 업로드된 파일의 실제 File 객체
      .map((file) => file.url!) // string[]

    // 새 이미지만 업로드
    fileList.forEach((file) => {
      if (file.originFileObj) {
        data.append('productImg', file.originFileObj)
      }
    })

    // 기존 이미지 URL을 함께 전송 (imgUrls로)
    originalImageUrls.forEach((url) => {
      data.append('imgUrl', url)
    })

    // 기존 이미지 S3 key 보내기
    const keepKeys = fileList
      .filter((file) => !file.originFileObj)
      .map((file) => file.key!) // 기존 이미지의 key만

    keepKeys.forEach((key) => {
      data.append('S3Key', key)
    })

    // product 수정 API
    if (mode === 'edit' && paramProductId) {
      updateProductMutate.mutate(
        { productId: Number(paramProductId), formData: data },
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
      { formData: data },
      {
        onSuccess: (data) => {
          setFormData({
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

  // 이미지 URL을 UploadFile[]로 변환
  const mapImageUrlsToFileList = (
    urls: string[],
    keys: string[]
  ): CustomUploadFile[] => {
    return urls.map((url, index) => ({
      uid: `existing-${index}`,
      name: `이미지${index + 1}`,
      status: 'done',
      url, // 이미지 미리보기 URL
      key: keys[index]
    }))
  }

  useEffect(() => {
    if (data) {
      const imageArray = Array.isArray(data.imgUrl)
        ? data.imgUrl
        : [data.imgUrl]

      const imgS3KeyArray = Array.isArray(data.s3Key)
        ? data.s3Key
        : [data.s3Key]

      const mappedImages = mapImageUrlsToFileList(imageArray, imgS3KeyArray)

      setFileList(mappedImages)

      setFormData({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        productImg: mappedImages
      })
    }
  }, [data])

  return (
    <div className='mx-auto w-[1050px]'>
      <div className='mx-auto my-20 w-1/2'>
        <h2 className='mb-10 text-2xl font-bold'>상품 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-8'>
            <div className='mb-2 flex items-start gap-1 font-bold'>
              <div>상품명</div>
              <div className='text-sm text-red-600'>*</div>
            </div>
            <input
              name='name'
              type='text'
              value={formData.name}
              onChange={onChangeInput}
              required
              className='w-full rounded-md border border-gray-200 px-3 py-2 focus:border-blue-300'
            />
          </div>
          <div className='mb-8'>
            <div className='mb-2 flex items-start gap-1 font-bold'>
              <div>가격 (원)</div>
              <div className='text-sm text-red-600'>*</div>
            </div>
            <input
              name='price'
              type='text'
              value={formData.price}
              onChange={onChangeInput}
              required
              className='w-full rounded-md border border-gray-200 px-3 py-2 focus:border-blue-300'
            />
          </div>
          <div className='mb-8'>
            <div className='mb-2 flex items-start gap-1 font-bold'>
              <div>수량 (개)</div>
              <div className='text-sm text-red-600'>*</div>
            </div>
            <input
              name='quantity'
              type='text'
              value={formData.quantity}
              onChange={onChangeInput}
              required
              className='w-full rounded-md border border-gray-200 px-3 py-2 focus:border-blue-300'
            />
          </div>
          <div className='mb-12'>
            <div className='mb-2 flex gap-1 font-bold'>
              <div>상품 이미지 (최대 5개)</div>
              <div className='text-sm text-red-600'>*</div>
            </div>
            <Dragger
              name='productImg'
              listType='picture'
              multiple
              maxCount={5}
              fileList={fileList}
              onChange={onChangeFile}
              beforeUpload={() => false}
            >
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                상품 이미지를 드래그하거나 클릭하여 업로드하세요.
              </p>
            </Dragger>
          </div>
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
