export interface CartItemRequest {
  productId: number
  quantity: number
}
export interface GetWishListResponse {
  id: number
  productId: number
  name: string
  price: number
  quantity: number
  imgUrl: string[]
}
