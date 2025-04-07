// 총 결제금액 계산
export const calculateTotal = (selectedItems, cartItems) => {
  // 선택된 아이템이 없으면 0 반환
  if (selectedItems.length === 0 || !cartItems) {
    return { total: 0 }
  }

  // 선택된 아이템들만 필터링
  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.id)
  )

  // 총 금액 계산
  const total = selectedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  return { total }
}
