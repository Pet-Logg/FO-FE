import { queryKeys } from '@/constants'
import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getWishList } from '../api'
import { GetWishListResponse } from '../types'

export const useGetWishList = (
  queryOptions?: UseQueryCustomOptions<GetWishListResponse[]>
) => {
  return useQuery({
    queryFn: () => getWishList(),
    queryKey: [queryKeys.WISHLIST, queryKeys.GET_WISHLIST],
    ...queryOptions
  })
}
