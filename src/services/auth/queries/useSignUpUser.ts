import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/api";
import { signupUser } from "../api";

export const useSignUpUser = (mutationOptions?: UseMutationCustomOptions) => {
return useMutation({
    mutationFn: signupUser,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}