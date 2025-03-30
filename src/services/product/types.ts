export interface CreateProductRequest {
  formData: FormData
}

export interface UpdateProductRequest {
  productId: number
  formData: FormData
}

export interface GetProductResponse {
  productId: number
  imgUrl: string
  name: string
  price: number
  quantity: number
  userId: number
  s3Key: string
}

export interface DeleteProductRequest {
  productId: number
}
