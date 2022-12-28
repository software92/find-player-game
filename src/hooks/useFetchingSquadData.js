import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { squadsState } from '../atom';

const useFetchingSquadData = (key, func, clubImage, id) => {
  const [isShow, setShow] = useState(false);
  const setSquads = useSetRecoilState(squadsState);

  const { isLoading: isClubSquadLoading, data: squad } = useQuery(
    key,
    () => func,
    {
      onError: (err) => console.log('club squad err', err),
      notifyOnChangeProps: ['isLoading', 'data'],
      refetchOnMount: false,
      select: (data) => data.squad,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
  const handleMouseEvent = (bool) => () => {
    if (isClubSquadLoading) return;
    setShow(bool);
  };

  useEffect(() => {
    if (!!squad) {
      setSquads((prev) => [
        {
          id,
          clubImage,
          squad,
        },
        ...prev,
      ]);
    }
  }, [id, clubImage, setSquads, squad]);

  return [isClubSquadLoading, squad, handleMouseEvent, isShow];
};

export default useFetchingSquadData;
