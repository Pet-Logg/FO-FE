import productApiClient from '@/api/productApiClient'
import {
  CreateProductRequest,
  DeleteProductRequest,
  GetProductResponse,
  UpdateProductRequest
} from './types'

// 상품 등록
export async function createProduct({
  formData
}: CreateProductRequest): Promise<void> {
  const response = await productApiClient.post('', formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

// 상품 수정
export async function updateProduct({
  productId,
  formData
}: UpdateProductRequest): Promise<void> {
  await productApiClient.put(`/${productId}`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 상품 전체 조회
export async function getAllProduct(): Promise<GetProductResponse[]> {
  try {
    const response = await productApiClient.get('/products', {
      withCredentials: true
    })
    return response.data.data
  } catch (error) {
    console.error('상품 목록 가져오기 실패:', error)
    throw new Error('상품 목록을 불러올 수 없습니다.')
  }
}

// productId로 상품 하나 조회
export async function getProduct(
  productId: number
): Promise<GetProductResponse> {
  try {
    const response = await productApiClient.get(`/${productId}`, {
      withCredentials: true
    })
    return response.data.data
  } catch (error) {
    console.error('상품 상세 조회 실패:', error)
    throw error
  }
}

// 상품 삭제
export async function deleteProduct({
  productId
}: DeleteProductRequest): Promise<void> {
  await productApiClient.delete(`/${productId}`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
