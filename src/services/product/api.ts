import { apiClient } from '@/api/apiClient'
import {
  CreateProductRequest,
  DeleteProductRequest,
  GetProductResponse,
  UpdateProductRequest
} from './types'
import { HttpContentType, HttpHeader } from '@/constants'

const PRODUCT_PREFIX = 'product'

// 상품 등록
export async function createProduct({
  formData
}: CreateProductRequest): Promise<void> {
  const response = await apiClient.post(`/${PRODUCT_PREFIX}`, formData, {
    headers: {
      [HttpHeader.CONTENT_TYPE]: HttpContentType.FORM_DATA
    }
  })
  return response.data
}

// 상품 수정
export async function updateProduct({
  productId,
  formData
}: UpdateProductRequest): Promise<void> {
  await apiClient.put(`/${PRODUCT_PREFIX}/${productId}`, formData, {
    headers: {
      [HttpHeader.CONTENT_TYPE]: HttpContentType.FORM_DATA
    }
  })
}

// 상품 전체 조회
export async function getAllProduct(): Promise<GetProductResponse[]> {
  try {
    const response = await apiClient.get(`/${PRODUCT_PREFIX}/products`)
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
    const response = await apiClient.get(`/${PRODUCT_PREFIX}/${productId}`)
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
  await apiClient.delete(`/${PRODUCT_PREFIX}/${productId}`)
}
