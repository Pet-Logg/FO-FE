import { getUserRole } from '@/utils/getUserInfo'
import { useEffect, useState } from 'react'
import { GetProductResponse } from '../types'

export const useProductDetail = (initialData?: GetProductResponse) => {
  const [mainImage, setMainImage] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!initialData) return

    if (Array.isArray(initialData.imgUrl) && initialData.imgUrl.length > 0) {
      setMainImage(initialData.imgUrl[0])
    } else {
      setMainImage(initialData.imgUrl)
    }

    const role = getUserRole()

    if (role === 'ADMIN') {
      setIsAdmin(true)
    }
  }, [initialData])

  // 수량 증가 감소
  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setQuantity((prev) => {
      if (type === 'increase') return prev + 1
      return prev > 1 ? prev - 1 : 1
    })
  }

  return {
    mainImage,
    setMainImage,
    quantity,
    isAdmin,
    handleQuantityChange
  }
}
