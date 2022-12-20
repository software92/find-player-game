import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getClubs, getSquad } from '../api';
import { clubsState, squadsState } from '../atom';
import Club from './Club';

const ClubList = styled.div`
  min-width: 15%;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px;
  background-color: #8ecae6;
  border-radius: 15px;
`;

const ClubViews = () => {
  const [clubs, setClubs] = useRecoilState(clubsState);
  const [squads, setSquads] = useRecoilState(squadsState);

  const loadClubs = useCallback(async () => {
    const loadClubs = await getClubs();
    setClubs(loadClubs);
  }, []);

  const loadSquads = useCallback(async () => {
    let totalSquad = [];

    for (const clubInfo of clubs) {
      const clubSquad = await getSquad(clubInfo.id);
      const tempClubObj = {
        id: clubInfo.id,
        clubImage: clubInfo.clubImage,
        squad: clubSquad,
      };
      totalSquad.push(tempClubObj);
    }
    setSquads(totalSquad);
  }, [clubs]);

  useEffect(() => {
    loadClubs();
  }, [loadClubs]);

  useEffect(() => {
    if (clubs.length > 0) {
      loadSquads();
    }
  }, [clubs, loadSquads]);

  console.log('clubs', clubs);
  console.log('squads arr', squads);
  return (
    <ClubList>
      {clubs && clubs.length > 0
        ? clubs.map((club) => <Club key={club.id} {...club} />)
        : 'loading..'}
      {/* To be load style 추가 */}
    </ClubList>
  );
};

export default ClubViews;
