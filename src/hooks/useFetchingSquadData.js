import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { squadsState } from '../atom';

const useFetchingSquadData = (key, func, clubImage, id) => {
  const [isShow, setShow] = useState(false);
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
  const showClub = () => {
    if (isLoading) return;
    setShow(true);
  };
  const outClub = () => {
    if (isLoading) return;
    setShow(false);
  };

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
  }, [setSquads, data, id, clubImage]);

  return [isLoading, squad, showClub, outClub, isShow];
};

export default useFetchingSquadData;
