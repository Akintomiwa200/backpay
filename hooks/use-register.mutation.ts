import { useMutation } from '@tanstack/react-query';
import http from '@/service/http';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: any) => http.httpRegisterUser(data),
  });
};

export const useRegisterUserMutate = () => {
  return useMutation({
    mutationFn: (data: { id: string; password: string }) =>
      http.httpRegisterMutation(data),
  });
};

export const useRegisterSetQuestionMutate = () => {
  return useMutation({
    mutationFn: (data: { id: string; data: any[] }) =>
      http.httpUpdateSecurityQuestionMutation(data),
  });
};
