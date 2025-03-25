import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { deletePet } from '../api'

export const useDeletePet = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: deletePet,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
