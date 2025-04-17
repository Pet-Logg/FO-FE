import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { GetCartResponse } from '../types'
import { getOrderSheet } from '../api'

export const useGetOrderSheet = (
  selectedItems: number[],
  queryOptions?: UseQueryCustomOptions<GetCartResponse[]>
) => {
  return useQuery({
    queryFn: () => getOrderSheet(selectedItems),
    queryKey: [],
    ...queryOptions
  })
}
