import { useQuery } from '@tanstack/react-query'
import { fetchTeam, fetchTeamIdsInLeague } from '../services/clientService'
import type { IFirebaseTeamDetail } from '../types'
import { REACT_QUERY_OPTIONS } from '@/api'

const queryKeys = (leagueId: number) => [leagueId, 'league', 'teams'] as const

const useFetchingTeamsDataInLeague = (leagueId: number) => {
  const {
    isPending,
    error,
    data: teamsInLeague,
  } = useQuery<IFirebaseTeamDetail[], Error>({
    queryKey: queryKeys(leagueId),
    queryFn: async () => {
      const teamIds = await fetchTeamIdsInLeague(leagueId)

      const promiseArr = teamIds.map(id => fetchTeam(id))
      const teams = await Promise.all(promiseArr)

      return teams.filter(team => team !== null)
    },
    ...REACT_QUERY_OPTIONS,
  })

  return { isPending, error, teamsInLeague }
}

export default useFetchingTeamsDataInLeague
