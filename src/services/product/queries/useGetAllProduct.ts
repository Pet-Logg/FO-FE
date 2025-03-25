import { queryKeys } from '@/constants'
import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getAllProduct } from '../api'
import { GetProductResponse } from '../types'

export const useGetAllProduct = (
  queryOptions?: UseQueryCustomOptions<GetProductResponse[]>
) => {
  return useQuery({
    queryFn: () => getAllProduct(),
    queryKey: [queryKeys.PRODUCT, queryKeys.GET_PRODUCT],
    ...queryOptions
  })
}
