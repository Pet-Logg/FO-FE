import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { updatePet } from '../api'

export const useUpdatePet = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: updatePet,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
