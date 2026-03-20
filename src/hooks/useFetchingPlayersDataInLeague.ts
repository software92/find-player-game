import { useQuery } from '@tanstack/react-query'
import { fetchPlayersDataInLeague } from '@/services/clientService'
import { REACT_QUERY_OPTIONS } from '@/api'
import { DEFAULT_API_PARAMS } from 'shared/params'
import type { IFirebasePlayer } from 'shared/api.types'

const queryKeys = (leagueId: number) => [leagueId, 'league', 'players'] as const

const useFetchingPlayersDataInLeague = (
  leagueId: number,
  options?: {
    initialData?: IFirebasePlayer[]
    enabled?: boolean
  },
) => {
  const {
    isPending,
    error,
    data: playersInLeague,
  } = useQuery<IFirebasePlayer[], Error>({
    queryKey: queryKeys(leagueId),
    queryFn: () => fetchPlayersDataInLeague(DEFAULT_API_PARAMS.league),
    initialData: options?.initialData,
    enabled: options?.enabled,
    ...REACT_QUERY_OPTIONS,
  })

  return { isPending, error, playersInLeague }
}

export default useFetchingPlayersDataInLeague
