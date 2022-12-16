import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getClubs } from '../api';
import Club from './Club';

const ClubList = styled.div`
  width: 35%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  background-color: #8ecae6;
  padding: 10px 0;
  border-radius: 15px;
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
    <ClubList>
      {clubs && clubs.length > 0
        ? clubs.map((club) => <Club key={club.id} {...club} />)
        : 'loading..'}
    </ClubList>
  );
};

export default ClubViews;
