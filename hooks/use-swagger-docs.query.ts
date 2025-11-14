import http from '@/service/http';
import { useQuery } from '@tanstack/react-query';

export const useSwaggerDocs = () => {
  return useQuery({
    queryKey: ['swagger_docs'],
    queryFn: http.httpGetSwaggerDocs,
  });
};
