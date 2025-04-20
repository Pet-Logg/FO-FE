import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { GetCartResponse } from '../types'
import { getOrderSheet } from '../api'
import { queryKeys } from '@/constants'

export const useGetOrderSheet = (
  selectedItems: number[],
  queryOptions?: UseQueryCustomOptions<GetCartResponse[]>
) => {
  return useQuery({
    queryFn: () => getOrderSheet(selectedItems),
    queryKey: [queryKeys.ORDER_SHEET, queryKeys.GET_ORDER_SHEET],
    ...queryOptions
  })
}
