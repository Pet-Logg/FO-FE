import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { addWishList } from '../api'
import { queryClient } from '@/utils/queryClient'
import { queryKeys } from '@/constants'

export const useAddWishList = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: addWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.WISHLIST, queryKeys.GET_WISHLIST]
      })
    },
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
