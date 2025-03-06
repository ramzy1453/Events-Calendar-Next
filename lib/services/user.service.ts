import { useMutation, useQuery } from "@tanstack/react-query";
import UserApi from "../api/user";
import { IOTP } from "@/types/user";

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
    queryFn: () => UserApi.verify(),
  });
}

export function useLogoutMutation() {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: UserApi.logout,
  });
}

export function useSendOTPMutation() {
  return useMutation({
    mutationKey: ["sendOTP"],
    mutationFn: (email: string) => UserApi.sendOTP(email),
  });
}
export function useVerifyOTPMutation() {
  return useMutation({
    mutationKey: ["verifyOTP"],
    mutationFn: (otpInput: IOTP) => UserApi.verifyOTP(otpInput),
  });
}
