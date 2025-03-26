import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { updateWishList } from '../api'
import { queryClient } from '@/utils/queryClient'
import { queryKeys } from '@/constants/keys'

export const useUpdateWishList = (
  mutationOptions?: UseMutationCustomOptions
) => {
  return useMutation({
    mutationFn: updateWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.WISHLIST, queryKeys.GET_WISHLIST]
      })
    },
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
