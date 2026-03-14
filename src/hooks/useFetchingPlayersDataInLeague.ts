import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { squadsState } from '../atom'
import { useQuery } from '@tanstack/react-query'
import type { IFirebasePlayer } from '../types'
import { fetchPlayer, fetchPlayerIdsInLeague } from '../services/clientService'

const STATIC_DATA_OPTIONS = {
  staleTime: 1000 * 60 * 30, // 30분
  gcTime: 1000 * 60 * 30, // staleTime보다 같거나 길게 설정
  refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
  refetchOnReconnect: false, // 네트워크 재연결 시 재요청 방지
}

const queryKeys = (leagueId: number) => [leagueId, 'league', 'players'] as const

const useFetchingPlayersDataInLeague = (leagueId: number) => {
  // const setSquads = useSetRecoilState(squadsState)

  const {
    isPending,
    error,
    data: playersInLeague,
  } = useQuery<IFirebasePlayer[], Error>({
    queryKey: queryKeys(leagueId),
    queryFn: async () => {
      const playerIds = await fetchPlayerIdsInLeague(leagueId)
      const requestPromise = playerIds.map(id => fetchPlayer(id))
      const players = await Promise.all(requestPromise).then(result =>
        result.flat(),
      )

      return players
    },
    ...STATIC_DATA_OPTIONS,
  })

  return { isPending, error, playersInLeague }
}

export default useFetchingPlayersDataInLeague
