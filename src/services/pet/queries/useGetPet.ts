import { queryKeys } from '@/constants'
import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getPet } from '../api'
import { GetPetResponse } from '../types'

export const useGetPet = (
  petId: number | null,
  queryOptions?: UseQueryCustomOptions<GetPetResponse>
) => {
  return useQuery({
    queryFn: () => getPet(Number(petId)),
    queryKey: [queryKeys.PET, queryKeys.GET_PET, petId],
    enabled: Boolean(petId),
    ...queryOptions
  })
}
