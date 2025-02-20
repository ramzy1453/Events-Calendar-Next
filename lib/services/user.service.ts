import { useMutation, useQuery } from "@tanstack/react-query";
import UserApi from "../api/user";

export function useRegisterMutation() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: UserApi.register,
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: UserApi.login,
  });
}

export function useVerifyQuery() {
  return useQuery({
    queryKey: ["verify"],
    queryFn: UserApi.verify,
  });
}

export function useLogoutMutation() {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: UserApi.logout,
  });
}
