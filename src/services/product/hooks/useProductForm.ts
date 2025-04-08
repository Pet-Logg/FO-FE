import { CustomUploadFile } from '@/types/CustomUploadFile'
import { CreateProductData } from '@/types/ProductUploadData'
import { mapImageUrlsToFileList } from '@/utils/img'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { GetProductResponse } from '../types'

export const useProductForm = (initialData?: GetProductResponse) => {
  const [productData, setProductData] = useState<CreateProductData>({
    name: '',
    productImg: [],
    price: 0,
    quantity: 0
  })

  const [fileList, setFileList] = useState<CustomUploadFile[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // 파일(이미지) 올리기
  const handleImageUpload = ({
    fileList
  }: {
    fileList: CustomUploadFile[]
  }) => {
    if (fileList.length > 5) {
      message.error('최대 5개의 이미지만 업로드할 수 있습니다.')
      return
    }
    setFileList(fileList)
    setProductData((prev) => ({
      ...prev,
      productImg: fileList
    }))
  }

  useEffect(() => {
    if (initialData) {
      const imageArray = Array.isArray(initialData.imgUrl)
        ? initialData.imgUrl
        : [initialData.imgUrl]

      const imgS3KeyArray = Array.isArray(initialData.s3Key)
        ? initialData.s3Key
        : [initialData.s3Key]

      const mappedImages = mapImageUrlsToFileList(imageArray, imgS3KeyArray)

      setFileList(mappedImages)

      setProductData({
        name: initialData.name,
        price: initialData.price,
        quantity: initialData.quantity,
        productImg: mappedImages
      })
    }
  }, [initialData, setFileList, setProductData])

  return {
    productData,
    setProductData,
    fileList,
    setFileList,
    handleInputChange,
    handleImageUpload
  }
}
