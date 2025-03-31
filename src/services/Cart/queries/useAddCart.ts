import { queryKeys } from '@/constants'
import { UseMutationCustomOptions } from '@/types/api'
import { queryClient } from '@/utils/queryClient'
import { useMutation } from '@tanstack/react-query'
import { addCart } from '../api'

export const useAddCart = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CART, queryKeys.GET_CART]
      })
    },
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
