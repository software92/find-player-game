import { useQuery } from '@tanstack/react-query'
import { fetchTeam } from '../services/clientService'
import { REACT_QUERY_OPTIONS } from '@/api'
import type { IFirebaseTeamDetail } from '../types'

// 단일 팀 정보 조회
const useFetchingTeamData = (teamId: number) => {
  const queryKeys = [teamId, 'total', 'team'] as const
  const {
    isPending,
    error,
    data: team,
  } = useQuery<IFirebaseTeamDetail, Error>({
    queryKey: queryKeys,
    queryFn: () => fetchTeam(teamId),
    ...REACT_QUERY_OPTIONS,
  })

  return { isPending, error, team }
}

export default useFetchingTeamData
