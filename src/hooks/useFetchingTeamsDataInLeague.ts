import { useQuery } from '@tanstack/react-query'
import { fetchTeam, fetchTeamIdsInLeague } from '../services/clientService'
import { REACT_QUERY_OPTIONS } from '@/api'
import type { IFirebaseTeamDetail } from '../types'

const useFetchingTeamsDataInLeague = (leagueId: number) => {
  const queryKeys = [leagueId, 'league', 'teams'] as const
  const {
    isPending,
    error,
    data: teamsInLeague,
  } = useQuery<IFirebaseTeamDetail[], Error>({
    queryKey: queryKeys,
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
