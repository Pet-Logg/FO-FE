import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { createPet } from '../api'

export const useCreatePet = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPet,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
