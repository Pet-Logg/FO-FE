import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { createProduct } from '../api'

export const useCreateProduct = (
  mutationOptions?: UseMutationCustomOptions
) => {
  return useMutation({
    mutationFn: createProduct,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
