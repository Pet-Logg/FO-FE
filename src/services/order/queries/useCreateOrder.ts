import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { createOrder } from '../api'

export const useCreateOrder = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createOrder,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
