import { queryKeys } from '@/constants'
import { UseMutationCustomOptions } from '@/types/api'
import { queryClient } from '@/utils/queryClient'
import { useMutation } from '@tanstack/react-query'
import { addWishList } from '../api'

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
