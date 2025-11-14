import http from '@/service/http';
import { useQuery } from '@tanstack/react-query';

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['get_users'],
    queryFn: http.httpGetUsers,
  });
};
