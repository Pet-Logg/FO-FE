import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { updateProduct } from '../api'

export const useUpdateProduct = (
  mutationOptions?: UseMutationCustomOptions
) => {
  return useMutation({
    mutationFn: updateProduct,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
