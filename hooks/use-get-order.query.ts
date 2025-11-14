import http from '@/service/http';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const useGetOrderQuery = () => {
  const searchParams = useSearchParams();
  const oid = searchParams.get('oid');
  return useQuery({
    queryKey: ['get_order_details', oid],
    queryFn: http.httpGetOrderDetails,
    enabled: !!oid,
  });
};
