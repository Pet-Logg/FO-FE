import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/api";
import { login } from "../api";

export const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
return useMutation({
    mutationFn: login,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}