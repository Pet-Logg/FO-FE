import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/api";
import { changePassword } from "../api";

export const useChangePassword = (mutationOptions?: UseMutationCustomOptions) => {
return useMutation({
    mutationFn: changePassword,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}