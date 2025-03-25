import { queryKeys } from '@/constants'
import { UseQueryCustomOptions } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { getAllPet } from '../api'
import { GetAllPetResponse } from '../types'

export const useGetAllPet = (
  queryOptions?: UseQueryCustomOptions<GetAllPetResponse[]>
) => {
  return useQuery({
    queryFn: () => getAllPet(),
    queryKey: [queryKeys.PET, queryKeys.GET_PET],
    ...queryOptions
  })
}
