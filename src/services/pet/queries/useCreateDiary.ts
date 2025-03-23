import { useMutation } from '@tanstack/react-query'
import { UseMutationCustomOptions } from '@/types/api'
import { createDiary } from '../api'

export const useCreateDiary = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createDiary,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
