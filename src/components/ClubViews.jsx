import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getClubs } from '../api';

const Container = styled.div`
  width: 40%;
`;

const ClubViews = () => {
  const [clubs, setClubs] = useState([]);

  const loadClubs = async () => {
    const clubs = await getClubs();
    setClubs(clubs);
  };

  useEffect(() => {
    loadClubs();
  }, []);

  return (
    <Container>
      {clubs && clubs.length > 0
        ? clubs.map((club) => <p key={club.id}>{club.clubName}</p>)
        : 'loading..'}
    </Container>
  );
};

export default ClubViews;
