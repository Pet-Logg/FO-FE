import { UseMutationCustomOptions } from '@/types/api'
import { queryClient } from '@/utils/queryClient'
import { useMutation } from '@tanstack/react-query'
import { createOrder } from '../api'

export const useCreateOrder = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({})
    },
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
