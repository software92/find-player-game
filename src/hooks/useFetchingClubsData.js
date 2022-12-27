import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { clubsState } from '../atom';

const useFetchingClubsData = (key, func) => {
  const [clubs, setClubs] = useRecoilState(clubsState);

  const { isLoading, data } = useQuery(key, func, {
    onError: (err) => console.log('query err', err),
    notifyOnChangeProps: ['isLoading', 'data'],
    refetchOnMount: false,
    select: (data) => data.table.slice(0, 5),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // fetcing이 끝난 후(data를 가져오면) setState 실행
  useEffect(() => {
    setClubs(data);
  }, [setClubs, data]);

  return [isLoading, data];
};

export default useFetchingClubsData;
