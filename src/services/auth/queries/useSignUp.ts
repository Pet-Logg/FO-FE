import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/api";
import { signup } from "../api";

export const useSignUp = (mutationOptions?: UseMutationCustomOptions) => {
return useMutation({
    mutationFn: signup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}