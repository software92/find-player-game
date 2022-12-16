import { useState } from 'react';
import styled from 'styled-components';
import ClubModal from './ClubModal';

const Container = styled.div`
  font-size: 15px;
  margin: 0 auto;
  &:not(:last-child) {
    margin-bottom: 1px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Emblem = styled.img`
  width: 45px;
  //   margin: 5px;
`;

const Club = ({ clubImage, clubName, id }) => {
  const [isShow, setShow] = useState(false);

  const showClub = async () => {
    setShow(true);
  };
  const outClub = () => {
    setShow(false);
  };

  return (
    <Container onMouseOver={() => showClub()} onMouseOut={() => outClub()}>
      <Emblem src={clubImage} />
      {isShow ? <ClubModal /> : null}
    </Container>
  );
};

export default Club;
