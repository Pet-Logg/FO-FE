import productApiClient from '@/api/productApiClient'
import {
  CartItemRequest,
  DeleteWishListRequest,
  GetWishListResponse
} from './types'

// 위시리스트 추가
export async function addWishList({
  productId,
  quantity
}: CartItemRequest): Promise<void> {
  const response = await productApiClient.post(
    '/wishList',
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

// 위시리스트 조회
export async function getWishList(): Promise<GetWishListResponse[]> {
  const response = await productApiClient.get('/wishList', {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data.data
}

// 위시리스트 수정
export async function updateWishList({
  productId,
  quantity
}: CartItemRequest): Promise<void> {
  const response = await productApiClient.put(
    '/wishList',
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

// 위시리스트 삭제
export async function deleteWishList({
  selectedItems
}: DeleteWishListRequest): Promise<void> {
  const response = await productApiClient.delete('/wishList', {
    data: { selectedItems },
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}
