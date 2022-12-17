import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getClubs } from '../api';
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

const tempClubs = [
  {
    id: '11',
    group: null,
    rank: 1,
    oldRank: 1,
    clubName: 'FC Arsenal',
    clubImage:
      'https://tmssl.akamaized.net/images/wappen/medium/11.png?lm=1489787850',
    points: 37,
    goals: 33,
    goalsConceded: 11,
    goalDifference: 22,
    matches: 14,
    wins: 12,
    losses: 1,
    draw: 1,
    markID: '31',
    markClass: 'meister',
    markColor: '#afd179',
    markDescription: 'Meister & UEFA-Champions-League',
  },
  {
    id: '281',
    group: null,
    rank: 2,
    oldRank: 2,
    clubName: 'Manchester City',
    clubImage:
      'https://tmssl.akamaized.net/images/wappen/medium/281.png?lm=1467356331',
    points: 32,
    goals: 40,
    goalsConceded: 14,
    goalDifference: 26,
    matches: 14,
    wins: 10,
    losses: 2,
    draw: 2,
    markID: '78',
    markClass: 'gruen',
    markColor: '#c3dc9a',
    markDescription: 'UEFA Champions League',
  },
  {
    id: '762',
    group: null,
    rank: 3,
    oldRank: 3,
    clubName: 'Newcastle Utd.',
    clubImage:
      'https://tmssl.akamaized.net/images/wappen/medium/762.png?lm=1472921161',
    points: 30,
    goals: 29,
    goalsConceded: 11,
    goalDifference: 18,
    matches: 15,
    wins: 8,
    losses: 1,
    draw: 6,
    markID: '78',
    markClass: 'gruen',
    markColor: '#c3dc9a',
    markDescription: 'UEFA Champions League',
  },
  {
    id: '148',
    group: null,
    rank: 4,
    oldRank: 4,
    clubName: 'Tottenham',
    clubImage:
      'https://tmssl.akamaized.net/images/wappen/medium/148.png?lm=1544345801',
    points: 29,
    goals: 31,
    goalsConceded: 21,
    goalDifference: 10,
    matches: 15,
    wins: 9,
    losses: 4,
    draw: 2,
    markID: '78',
    markClass: 'gruen',
    markColor: '#c3dc9a',
    markDescription: 'UEFA Champions League',
  },
  {
    id: '985',
    group: null,
    rank: 5,
    oldRank: 5,
    clubName: 'Manchester Utd.',
    clubImage:
      'https://tmssl.akamaized.net/images/wappen/medium/985.png?lm=1457975903',
    points: 26,
    goals: 20,
    goalsConceded: 20,
    goalDifference: 0,
    matches: 14,
    wins: 8,
    losses: 4,
    draw: 2,
    markID: '4',
    markClass: 'uefa',
    markColor: '#bdd9ef',
    markDescription: 'UEFA Europa League',
  },
];

const ClubViews = () => {
  const [clubs, setClubs] = useState([]);

  const loadClubs = async () => {
    // const clubs = await getClubs();
    setClubs(tempClubs);
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
