import { useState } from 'react';
import styled from 'styled-components';
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

  const showClub = async () => setShow(true);
  const outClub = () => setShow(false);

  return (
    <Container onMouseOver={() => showClub()} onMouseOut={() => outClub()}>
      <Emblem src={clubImage} />
      {isShow ? <ClubSquadModal id={id} /> : null}
    </Container>
  );
};

export default Club;
