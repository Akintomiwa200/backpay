import http from '@/service/http';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const useRegisterQuery = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('uid');
  console.log({ id });
  return useQuery({
    queryKey: ['user_registration', id],
    queryFn: http.httpRegisterQuery,
    enabled: !!id,
  });
};
