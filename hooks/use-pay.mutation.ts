import http from '@/service/http';
import { useMutation } from '@tanstack/react-query';

export const usePayMutation = () => {
  return useMutation({
    mutationFn: (data: { oid: string; pin: string; type: string }) =>
      http.httpPayOrder(data),
  });
};
