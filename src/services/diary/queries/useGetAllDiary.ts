import { queryKeys } from '@/constants'
import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getAllDiary } from '../../pet/api'
import { GetDiaryResponse } from '../../pet/types'

export const useGetAllDiary = (
  queryOptions?: UseQueryCustomOptions<GetDiaryResponse[]>
) => {
  return useQuery({
    queryFn: () => getAllDiary(),
    queryKey: [queryKeys.DIARY, queryKeys.GET_DIARY],
    ...queryOptions
  })
}
