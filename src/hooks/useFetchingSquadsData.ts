import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { squadsState } from '../atom'
import { fetchSquads } from '../services/clientService'
import { useQuery } from '@tanstack/react-query'
import type { IPlayer } from '../types'

const STATIC_DATA_OPTIONS = {
  staleTime: 1000 * 60 * 30, // 30분
  gcTime: 1000 * 60 * 30, // staleTime보다 같거나 길게 설정
  refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
  refetchOnReconnect: false, // 네트워크 재연결 시 재요청 방지
}

const queryKeys = (leagueId: number) => [leagueId, 'total', 'squads'] as const

const useFetchingSquadsData = (leagueId: number) => {
  // const setSquads = useSetRecoilState(squadsState)

  const {
    isPending,
    error,
    data: squads,
  } = useQuery<IPlayer[][], Error, IPlayer[]>({
    queryKey: queryKeys(leagueId),
    queryFn: () => fetchSquads({}),
    ...STATIC_DATA_OPTIONS,
  })

  return { isPending, error, squads }
}

export default useFetchingSquadsData
