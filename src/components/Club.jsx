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
    cursor: ${(props) => (props.isClubSquadLoading ? 'wait' : 'pointer')};
  }
`;

const Emblem = styled.img`
  width: 70%;
  z-index: 0;
  margin-top: 10px;
`;

const Club = ({ clubImage, clubName, id }) => {
  const [isShow, setShow] = useState(false);
  const [squad, setSquad] = useState([]);
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
      setSquad(clubObj);
      setSquads((prev) => [clubObj, ...prev]);
    }
  }, [setSquad, setSquads, clubSquad, id, clubImage]);

  const showClub = () => {
    if (isClubSquadLoading) return;
    setShow(true);
  };
  const outClub = () => {
    if (isClubSquadLoading) return;
    setShow(false);
  };

  return (
    <Container
      isClubSquadLoading={isClubSquadLoading}
      onMouseOver={() => showClub()}
      onMouseOut={() => outClub()}
    >
      <Emblem src={clubImage} />
      {isShow && (
        <ClubSquadModal
          id={id}
          isClubSquadLoading={isClubSquadLoading}
          squad={squad}
        />
      )}
    </Container>
  );
};

export default Club;
