import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getClubs } from '../api';
import { clubsState } from '../atom';
import Club from './Club';

const ClubList = styled.div`
  width: 230px;
  height: 230px;
  ${(props) =>
    props.isClubsLoading
      ? 'display: flex'
      : 'display: grid; grid-template-columns: repeat(3, 1fr);'};
  padding: 10px;
  background-color: #8ecae6;
  border-radius: 15px;
  &:hover {
    cursor: ${(props) => (props.isClubsLoading ? 'wait' : 'cursor')};
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Loader = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin: auto;
`;

const ClubViews = () => {
  const [clubs, setClubs] = useRecoilState(clubsState);

  const { isLoading: isClubsLoading, data: loadClubs } = useQuery(
    'clubs',
    getClubs,
    {
      onError: (err) => console.log('query err', err),
      notifyOnChangeProps: ['isLoading', 'data'],
      refetchOnMount: false,
      select: (data) => data.table.slice(0, 3),
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  // fetcing이 끝난 후(data를 가져오면) setState 실행
  useEffect(() => {
    setClubs(loadClubs);
  }, [setClubs, loadClubs]);

  return (
    <ClubList isClubsLoading={isClubsLoading}>
      {isClubsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        !!clubs &&
        clubs.length > 0 &&
        clubs.map((club) => <Club key={club.id} {...club} />)
      )}
    </ClubList>
  );
};

export default ClubViews;
