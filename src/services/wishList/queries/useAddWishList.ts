import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { addWishList } from '../api'

export const useAddWishList = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: addWishList,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
