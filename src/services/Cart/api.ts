import productApiClient from '@/api/productApiClient'
import { CartItemRequest, DeleteCartRequest, GetCartResponse } from './types'

// 장바구니 추가
export async function addCart({
  productId,
  quantity
}: CartItemRequest): Promise<void> {
  const response = await productApiClient.post(
    '/cart',
    { productId, quantity },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data
}

// 장바구니 조회
export async function getCart(): Promise<GetCartResponse[]> {
  try {
    const response = await productApiClient.get('/cart', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
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
  const response = await productApiClient.put(
    '/cart',
    { productId, quantity },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data.data
}

// 장바구니 삭제
export async function deleteCart({
  selectedItems
}: DeleteCartRequest): Promise<void> {
  const response = await productApiClient.delete('/cart', {
    data: { selectedItems },
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}
