import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { deleteWishList } from '../api'
import { queryClient } from '@/utils/queryClient'
import { queryKeys } from '@/constants'

export const useDeleteWishList = (
  mutationOptions?: UseMutationCustomOptions
) => {
  return useMutation({
    mutationFn: deleteWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.WISHLIST, queryKeys.GET_WISHLIST]
      })
    },
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
