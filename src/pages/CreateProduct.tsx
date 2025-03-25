import { useCreateProduct } from '@/services/product/queries/useCreateProduct'
import { useGetProduct } from '@/services/product/queries/useGetProduct'
import { useUpdateProduct } from '@/services/product/queries/useUpdateProduct'
import { createProductData } from '@/types/ProductUploadData'
import { InboxOutlined } from '@ant-design/icons'
import { Upload, message } from 'antd'
import { UploadFile } from 'antd/es/upload/interface'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import OneButtonModal from '../components/OneButtonModal'

const { Dragger } = Upload

const CreateProduct: React.FC = () => {
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
  const mode = location.state?.mode || 'create'
  const [showModal, setShowModal] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const paramProductId = searchParams.get('productId')

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onChangeFile = ({ fileList }: { fileList: UploadFile[] }) => {
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

  const closeModal = () => {
    setShowModal(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.name === '' || formData.name === null) {
      message.error('상품명을 입력해주세요.')
      return
    }

    if (formData.price === 0 || formData.name === null) {
      message.error('상품 가격을 입력해주세요.')
      return
    }

    if (formData.quantity === 0 || formData.quantity === null) {
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

    formData.productImg.forEach((file) => {
      if (file.originFileObj) {
        data.append('productImg', file.originFileObj)
      }
    })

    // 펫 수정 제출
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
    }

    // 펫 생성 제출
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
          console.log('상품 등록에 실패했습니다')
        }
      }
    )
  }

  // 이미지 URL을 UploadFile[]로 변환
  const mapImageUrlsToFileList = (urls: string[]): UploadFile[] => {
    return urls.map((url, index) => ({
      uid: `existing-${index}`,
      name: `이미지${index + 1}`,
      status: 'done',
      url // 이미지 미리보기 URL
    }))
  }

  const { data } = useGetProduct(Number(paramProductId))

  useEffect(() => {
    if (data) {
      const imageArray = Array.isArray(data.imgUrl)
        ? data.imgUrl
        : [data.imgUrl]

      const mappedImages = mapImageUrlsToFileList(imageArray)

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

export default CreateProduct
