import { queryKeys } from '@/constants'
import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getCart } from '../api'
import { GetCartResponse } from '../types'

export const useGetCart = (
  queryOptions?: UseQueryCustomOptions<GetCartResponse[]>
) => {
  return useQuery({
    queryFn: () => getCart(),
    queryKey: [queryKeys.CART, queryKeys.GET_CART],
    ...queryOptions
  })
}
