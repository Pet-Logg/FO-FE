import { apiClient } from '@/api/apiClient'
import { CreateOrderRequest } from './types'

const PRODUCT_PREFIX = 'order'

// 주문 생성
export async function createOrder(
  CreateOrderRequestDto: CreateOrderRequest
): Promise<void> {
  const response = await apiClient.post(
    `/${PRODUCT_PREFIX}`,
    CreateOrderRequestDto
  )
  return response.data
}
