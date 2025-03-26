export interface CartItemRequest {
  productId: number
  quantity: number
}
export interface GetWishListResponse {
  id: number // wishListId
  productId: number
  name: string
  price: number
  quantity: number
  imgUrl: string[]
}

export interface DeleteWishListRequest {
  selectedItems: number[]
}
