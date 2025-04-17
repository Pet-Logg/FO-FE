import { useState } from 'react'

export const useCart = (cartItems) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  // 전체 선택 체크 박스
  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map((item) => item.id))
    }
  }

  // 상품 하나 체크 박스
  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  return {
    selectedItems,
    setSelectedItems,
    toggleSelectAll,
    toggleSelectItem
  }
}
