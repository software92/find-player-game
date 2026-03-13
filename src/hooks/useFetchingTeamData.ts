import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { clubsState } from '../atom'
import { useQuery } from '@tanstack/react-query'
import { fetchTeam } from '../services/clientService'
import type { IFirebaseTeamDetail } from '../types'

const STATIC_DATA_OPTIONS = {
  staleTime: 1000 * 60 * 30, // 30분
  gcTime: 1000 * 60 * 30, // staleTime보다 같거나 길게 설정
  refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
  refetchOnReconnect: false, // 네트워크 재연결 시 재요청 방지
}

const queryKeys = (teamId: number) => [teamId, 'total', 'clubs'] as const

// 단일 팀 정보 조회
const useFetchingTeamData = (teamId: number) => {
  // const setClubs = useSetRecoilState(clubsState)

  const {
    isPending,
    error,
    data: team,
  } = useQuery<IFirebaseTeamDetail, Error, IFirebaseTeamDetail>({
    queryKey: queryKeys(teamId),
    queryFn: () => fetchTeam(teamId),
    ...STATIC_DATA_OPTIONS,
  })

  return { isPending, error, team }
}

export default useFetchingTeamData
