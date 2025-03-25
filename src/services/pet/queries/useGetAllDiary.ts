import { queryKeys } from '@/constants'
import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getAllDiary } from '../api'
import { GetDiaryResponse } from '../types'

export const useGetAllDiary = (
  queryOptions?: UseQueryCustomOptions<GetDiaryResponse[]>
) => {
  return useQuery({
    queryFn: () => getAllDiary(),
    queryKey: [queryKeys.DIARY, queryKeys.GET_DIARY],
    ...queryOptions
  })
}
