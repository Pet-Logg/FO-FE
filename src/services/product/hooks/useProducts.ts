import { getUserRole } from '@/utils/getUserInfo'
import { useEffect, useState } from 'react'
import { GetProductResponse } from '../types'

export const useProducts = (initialData?: GetProductResponse[]) => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const role = getUserRole()
    if (role === 'ADMIN') {
      setIsAdmin(true)
    }
  }, [initialData])

  return { isAdmin }
}
