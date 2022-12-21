import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { getSquad } from '../api';
import { squadsState } from '../atom';
import ClubSquadModal from './ClubSquadModal';

const Container = styled.div`
  position: relative;
  font-size: 15px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const Emblem = styled.img`
  width: 70%;
  z-index: 0;
  margin-top: 10px;
`;

const Club = ({ clubImage, clubName, id }) => {
  const [isShow, setShow] = useState(false);
  const setSquads = useSetRecoilState(squadsState);

  const { isLoading: isClubSquadLoading, data: clubSquad } = useQuery(
    [clubName, 'squads'],
    () => getSquad(id),
    {
      onError: (err) => console.log('club squad err', err),
      notifyOnChangeProps: ['isLoading', 'data'],
      refetchOnMount: false,
      select: (data) => data.squad,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  useEffect(() => {
    if (!!clubSquad && clubSquad.length > 0) {
      const clubObj = {
        id,
        clubImage,
        squad: clubSquad,
      };
      setSquads((prev) => [clubObj, ...prev]);
    }
  }, [setSquads, clubSquad, id, clubImage]);

  const showClub = () => setShow(true);
  const outClub = () => setShow(false);

  return (
    <Container onMouseOver={() => showClub()} onMouseOut={() => outClub()}>
      <Emblem src={clubImage} />
      {isShow && (
        <ClubSquadModal id={id} isClubSquadLoading={isClubSquadLoading} />
      )}
    </Container>
  );
};

export default Club;
