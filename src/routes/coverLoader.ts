import { REACT_QUERY_OPTIONS } from '@/api'
import { DEFAULT_API_PARAMS } from '@/constant'
import { queryClient } from '@/queryClient'
import { fetchPlayersDataInLeague } from '@/services/clientService'

const coverLoader = async () => {
  const queryKey = ['players', 'all']

  return await queryClient.ensureQueryData({
    queryKey,
    queryFn: () => fetchPlayersDataInLeague(DEFAULT_API_PARAMS.league),
    ...REACT_QUERY_OPTIONS,
  })
}

export default coverLoader
