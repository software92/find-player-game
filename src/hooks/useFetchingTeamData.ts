import { useQuery } from '@tanstack/react-query'
import { fetchTeam } from '../services/clientService'
import type { IFirebaseTeamDetail } from '../types'
import { REACT_QUERY_OPTIONS } from '@/api'

const queryKeys = (teamId: number) => [teamId, 'total', 'team'] as const

// 단일 팀 정보 조회
const useFetchingTeamData = (teamId: number) => {
  const {
    isPending,
    error,
    data: team,
  } = useQuery<IFirebaseTeamDetail, Error>({
    queryKey: queryKeys(teamId),
    queryFn: () => fetchTeam(teamId),
    ...REACT_QUERY_OPTIONS,
  })

  return { isPending, error, team }
}

export default useFetchingTeamData
