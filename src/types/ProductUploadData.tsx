import { UploadFile } from 'antd'

export interface createProductData {
  name: string
  productImg: UploadFile[]
  price: number
  quantity: number
}
