import { apiClient } from '@/api/apiClient'
import { CartItemRequest, DeleteCartRequest, GetCartResponse } from './types'

const PRODUCT_PREFIX = 'product'

// 장바구니 추가
export async function addCart({
  productId,
  quantity
}: CartItemRequest): Promise<void> {
  const response = await apiClient.post(`/${PRODUCT_PREFIX}/cart`, {
    productId,
    quantity
  })
  return response.data
}

// 장바구니 조회
export async function getCart(): Promise<GetCartResponse[]> {
  try {
    const response = await apiClient.get(`/${PRODUCT_PREFIX}/cart`)
    return response.data.data
  } catch (error) {
    console.log('error', error)
    throw new Error('장바구니 조회 실패')
  }
}

// 장바구니 수정
export async function updateCart({
  productId,
  quantity
}: CartItemRequest): Promise<void> {
  const response = await apiClient.put(`/${PRODUCT_PREFIX}/cart`, {
    productId,
    quantity
  })
  return response.data.data
}

// 장바구니 삭제
export async function deleteCart({
  selectedItems
}: DeleteCartRequest): Promise<void> {
  const response = await apiClient.delete(`/${PRODUCT_PREFIX}/cart`, {
    data: { selectedItems }
  })
  return response.data
}

// 주문 선택한 아이템 조회하기
export async function getOrderSheet(
  selectedItems: number[]
): Promise<useGetOrderSheetResponse[]> {
  try {
    const response = await apiClient.post(`/${PRODUCT_PREFIX}/getOrderSheet`, {
      selectedItems
    })
    return response.data.data
  } catch (error) {
    console.log('error', error)
    throw new Error('주문서 아이템 조회 실패')
  }
}
