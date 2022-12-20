import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getClubs, getSquad } from '../api';
import { clubsState, squadsState } from '../atom';
import { tempClubs, tempSquad1, tempSquad2 } from '../tempData';
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
    // const loadClubs = await getClubs();
    // setClubs(loadClubs);
    // api 호출 데이터 대신 temp data 사용
    const newClubs = tempClubs.map((club) => {
      const newObj = {
        id: club.id,
        rank: club.rank,
        clubImage: club.clubImage,
      };
      return newObj;
    });

    setClubs(newClubs);
  }, []);

  const loadSquads = useCallback(() => {
    // api 호출 데이터 대신 temp data 사용
    if (clubs.length > 0) {
      const tempSquadArr = [
        {
          id: 11,
          clubImage:
            'https://tmssl.akamaized.net/images/wappen/medium/11.png?lm=1489787850',
          squad: tempSquad1,
        },
        {
          id: 148,
          clubImage:
            'https://tmssl.akamaized.net/images/wappen/medium/281.png?lm=1467356331',
          squad: tempSquad2,
        },
      ];
      setSquads(tempSquadArr);
    }
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
    </ClubList>
  );
};

export default ClubViews;
