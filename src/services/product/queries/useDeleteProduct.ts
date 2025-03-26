import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { deleteProduct } from '../api'

export const useDeleteProduct = (
  mutationOptions?: UseMutationCustomOptions
) => {
  return useMutation({
    mutationFn: deleteProduct,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
