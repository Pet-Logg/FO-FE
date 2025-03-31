import { UseMutationCustomOptions } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { logout } from '../api'

export const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions
  })
}
