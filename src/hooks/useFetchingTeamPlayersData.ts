import { fetchPlayer, fetchTeamPlayerIds } from '../services/clientService'
import { useQuery } from '@tanstack/react-query'
import { REACT_QUERY_OPTIONS } from '@/api'
import type { IFirebasePlayer } from 'shared/api.types'

// 48 웨햄, 50 맨시티 선수 목록 조회 실패 확인
const useFetchingTeamPlayersData = (teamId: number) => {
  const queryKeys = [teamId, 'team', 'players'] as const

  const {
    isPending,
    error,
    data: playerInTeam,
  } = useQuery<IFirebasePlayer[], Error>({
    queryKey: queryKeys,
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
