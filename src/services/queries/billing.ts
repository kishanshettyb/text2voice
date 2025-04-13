import { useQuery } from '@tanstack/react-query'
import { getUserTransactionDetails } from '../api/billing'

export function useGetUserTransactionDetails(customer_email: string) {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['userTransactions'],
    queryFn: () => getUserTransactionDetails(customer_email!),
    staleTime: 1000,
    enabled: !!customer_email
  })
  return { isLoading, isError, data, isFetching }
}
