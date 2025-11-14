import http from '@/service/http';
import { useMutation } from '@tanstack/react-query';

export const useCancelTransactionMutation = () => {
  return useMutation({
    mutationFn: (id: string) => http.httpCancelTransaction(id),
  });
};
