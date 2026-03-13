import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { clubsState } from '../atom'
import { useQuery } from '@tanstack/react-query'
import { fetchClub } from '../services/clientService'
import type { IFirebaseTeamDetail } from '../types'

const STATIC_DATA_OPTIONS = {
  staleTime: 1000 * 60 * 30, // 30분
  gcTime: 1000 * 60 * 30, // staleTime보다 같거나 길게 설정
  refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
  refetchOnReconnect: false, // 네트워크 재연결 시 재요청 방지
}

const queryKeys = (leagueId: number, teamId: number) =>
  [leagueId, teamId, 'total', 'clubs'] as const

const useFetchingClubData = (leagueId: number, teamId: number) => {
  // const setClubs = useSetRecoilState(clubsState)

  const {
    isPending,
    error,
    data: club,
  } = useQuery<IFirebaseTeamDetail, Error, IFirebaseTeamDetail>({
    queryKey: queryKeys(leagueId, teamId),
    queryFn: () => fetchClub({ leagueId, teamId }),
    ...STATIC_DATA_OPTIONS,
  })

  return { isPending, error, club }
}

export default useFetchingClubData
