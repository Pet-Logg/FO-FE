import { queryKeys } from '@/constants'
import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getDiary } from '../api'
import { GetDiaryResponse } from '../types'

export const useGetDiary = (
  diaryId: number | null,
  queryOptions?: UseQueryCustomOptions<GetDiaryResponse>
) => {
  return useQuery({
    queryFn: () => getDiary(Number(diaryId)),
    queryKey: [queryKeys.DIARY, queryKeys.GET_DIARY, diaryId],
    enabled: Boolean(diaryId),
    ...queryOptions
  })
}
