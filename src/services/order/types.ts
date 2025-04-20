export interface CreateOrderRequest {
  recipient: string
  phone: string
  address: string
  totalPrice: number
  items: {
    productId: number
    quantity: number
  }[]
}
