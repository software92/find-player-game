import { fetchPlayer, fetchTeamPlayerIds } from '../services/clientService'
import { useQuery } from '@tanstack/react-query'
import type { IFirebasePlayer } from '../types'
import { REACT_QUERY_OPTIONS } from '@/api'

const queryKeys = (teamId: number) => [teamId, 'team', 'players'] as const

const useFetchingTeamPlayersData = (teamId: number) => {
  const {
    isPending,
    error,
    data: playerInTeam,
  } = useQuery<IFirebasePlayer[], Error>({
    queryKey: queryKeys(teamId),
    queryFn: async () => {
      const playerIds = await fetchTeamPlayerIds(teamId)
      const requestPromise = playerIds.map(id => fetchPlayer(id))
      const players = await Promise.all(requestPromise).then(result =>
        result.flat(),
      )

      return players
    },
    ...REACT_QUERY_OPTIONS,
  })

  return { isPending, error, playerInTeam }
}

export default useFetchingTeamPlayersData
