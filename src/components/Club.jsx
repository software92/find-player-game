import styled from 'styled-components';
import { getSquad } from '../api';
import useFetchingSquadData from '../hooks/useFetchingSquadData';
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
  const [isClubSquadLoading, squad, showClub, outClub, isShow] =
    useFetchingSquadData([clubName, 'squads'], getSquad(id));

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
