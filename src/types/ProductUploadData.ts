import { UploadFile } from 'antd'

export interface CreateProductData {
  name: string
  productImg: UploadFile[]
  price: number
  quantity: number
}
