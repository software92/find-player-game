import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { squadsState } from '../atom';

const useFetchingData2 = (key, func, clubImage, id) => {
  const [squad, setSquad] = useState([]);
  const setSquads = useSetRecoilState(squadsState);

  // 전체 스쿼드를 저장하기 위한 query
  const { isLoading, data } = useQuery(key, () => func, {
    onError: (err) => console.log('club squad err', err),
    notifyOnChangeProps: ['isLoading', 'data'],
    refetchOnMount: false,
    select: (data) => data.squad,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (!!data && data.length > 0) {
      const clubObj = {
        id,
        clubImage,
        squad: data,
      };
      setSquad(clubObj);
      setSquads((prev) => [clubObj, ...prev]);
    }
  }, [setSquad, setSquads, data, id, clubImage]);

  return [isLoading, squad];
};

export default useFetchingData2;
