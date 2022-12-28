import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { clubsState } from '../atom';

const useFetchingClubsData = (key, func) => {
  const setClubs = useSetRecoilState(clubsState);

  const { isLoading, data: clubs } = useQuery(key, func, {
    onError: (err) => console.log('query err', err),
    notifyOnChangeProps: ['isLoading', 'data'],
    refetchOnMount: false,
    select: (data) => data.table.slice(0, 5),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // fetcing이 끝난 후(data를 가져오면) setState 실행
  useEffect(() => {
    setClubs(clubs);
  }, [setClubs, clubs]);

  return [isLoading, clubs];
};

export default useFetchingClubsData;
