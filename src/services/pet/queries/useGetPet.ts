import { queryKeys } from '@/constants'
import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getPetDetailById } from '../api'
import { GetPetDetailByIdResponse } from '../types'

export const useGetPet = (
  id: number | null,
  queryOptions?: UseQueryCustomOptions<GetPetDetailByIdResponse>
) => {
  return useQuery({
    queryFn: () => getPetDetailById(Number(id)),
    queryKey: [queryKeys.PET, queryKeys.GET_PET, id],
    enabled: Boolean(id),
    ...queryOptions
  })
}
