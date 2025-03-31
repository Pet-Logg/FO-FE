import { queryKeys } from '@/constants/keys'
import { UseMutationCustomOptions } from '@/types/api'
import { queryClient } from '@/utils/queryClient'
import { useMutation } from '@tanstack/react-query'
import { updateCart } from '../api'

export const useUpdateCart = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CART, queryKeys.GET_CART]
      })
    },
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
