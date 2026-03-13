import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { clubsState } from '../atom'
import { useQuery } from '@tanstack/react-query'
import { fetchTeam, fetchTeamIdsInLeague } from '../services/clientService'
import type { IFirebaseTeamDetail } from '../types'

const STATIC_DATA_OPTIONS = {
  staleTime: 1000 * 60 * 30, // 30분
  gcTime: 1000 * 60 * 30, // staleTime보다 같거나 길게 설정
  refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
  refetchOnReconnect: false, // 네트워크 재연결 시 재요청 방지
}

const queryKeys = (leagueId: number) => [leagueId, 'total', 'clubs'] as const

const useFetchingTeamsDataInLeague = (leagueId: number) => {
  // const setClubs = useSetRecoilState(clubsState)

  const {
    isPending,
    error,
    data: teams,
  } = useQuery<IFirebaseTeamDetail[], Error>({
    queryKey: queryKeys(leagueId),
    queryFn: async () => {
      const teamIds = await fetchTeamIdsInLeague(leagueId)
      const promiseArr = teamIds.map(id => fetchTeam(id))
      const result = await Promise.all(promiseArr)

      return result
    },
    ...STATIC_DATA_OPTIONS,
  })

  return { isPending, error, teams }
}

export default useFetchingTeamsDataInLeague
