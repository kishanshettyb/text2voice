import { useQuery } from '@tanstack/react-query'
import { getUserDetails } from '../api/user'

export function useGetUserDetails() {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['userTextToVoiceByUid'],
    queryFn: () => getUserDetails(),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}
