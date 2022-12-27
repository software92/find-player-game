import { useState } from 'react';
import styled from 'styled-components';
import { getSquad } from '../api';
import useFetchingData2 from '../hooks/useFetchingData2';
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
  const [isClubSquadLoading, squad] = useFetchingData2(
    [clubName, 'squads'],
    getSquad(id)
  );

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
