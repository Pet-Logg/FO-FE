import productApiClient from '@/api/productApiClient'
import { addWishRequest } from './types'

// 위시리스트 추가
export async function addWishList({
  productId,
  quantity
}: addWishRequest): Promise<void> {
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
