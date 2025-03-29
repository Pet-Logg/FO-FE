export interface CartItemRequest {
  productId: number
  quantity: number
}
export interface GetCartResponse {
  id: number // wishListId = cartId
  productId: number
  name: string
  price: number
  quantity: number
  imgUrl: string[]
}

export interface DeleteCartRequest {
  selectedItems: number[]
}
