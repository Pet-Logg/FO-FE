import { queryKeys } from '@/constants'
import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../api'
import { GetProductResponse } from '../types'

export const useGetProduct = (
  id: number | null,
  queryOptions?: UseQueryCustomOptions<GetProductResponse>
) => {
  return useQuery({
    queryFn: () => getProduct(Number(id)),
    queryKey: [queryKeys.PRODUCT, queryKeys.GET_PRODUCT, id],
    enabled: Boolean(id),
    ...queryOptions
  })
}
