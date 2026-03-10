import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { clubsState } from '../atom'
import { useQuery } from '@tanstack/react-query'
import { fetchClubs } from '../services/clientService'

const STATIC_DATA_OPTIONS = {
  staleTime: 1000 * 60 * 30, // 30분
  gcTime: 1000 * 60 * 30, // staleTime보다 같거나 길게 설정
  refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
  refetchOnReconnect: false, // 네트워크 재연결 시 재요청 방지
}

const queryKeys = (leagueId: number) => [leagueId, 'total', 'clubs']

const useFetchingClubsData = (leagueId: number) => {
  // const setClubs = useSetRecoilState(clubsState)

  const {
    isPending,
    error,
    data: clubs,
    refetch,
  } = useQuery({
    queryKey: queryKeys(leagueId),
    queryFn: () => fetchClubs(),
    ...STATIC_DATA_OPTIONS,
  })
  // const { isLoading, data: clubs } = useQuery(key, func, {
  //   onError: (err) => console.log('query err', err),
  //   notifyOnChangeProps: ['isLoading', 'data'],
  //   refetchOnMount: false,
  //   select: (data) => data.table.slice(0, 5),
  //   staleTime: Infinity,
  //   cacheTime: Infinity,
  // });

  // if (isPending) return 'loading...'
  // if (error) return error.message

  return { isPending, error, clubs, refetch }

  // fetcing이 끝난 후(data를 가져오면) setState 실행
  // useEffect(() => {
  //   setClubs(clubs)
  // }, [setClubs, clubs])

  // return [isLoading, clubs];
}

export default useFetchingClubsData
