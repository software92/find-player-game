import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { getClubs, getSquad } from '../api';
import { clubsState, isSquadsLoadingState, squadsState } from '../atom';
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
  const setIsSquadsLoading = useSetRecoilState(isSquadsLoadingState);
  const [clubs, setClubs] = useRecoilState(clubsState);
  const setSquads = useSetRecoilState(squadsState);

  const { isLoading: isClubsLoading, data: loadClubs } = useQuery(
    'clubs',
    getClubs,
    {
      onError: (err) => console.log('query err', err),
      notifyOnChangeProps: ['isLoading', 'data'],
    }
  );

  // loadClubs에서 호출한 각 클럽의 정보를 사용해 클럽의 스쿼드를 가져오고 새로운 객체 생성
  // 객체를 하나의 배열로 재 생성한다(totalSquad)
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
    setIsSquadsLoading(false);
  }, [clubs, setSquads, setIsSquadsLoading]);

  // fetcing이 끝난 후(data를 가져오면) setState 실행
  useEffect(() => {
    setClubs(loadClubs);
  }, [setClubs, loadClubs]);

  // api를 사용해 클럽의 정보를 clubs state에 저장하면 실행
  useEffect(() => {
    if (!!clubs && clubs.length > 0) {
      loadSquads();
    }
  }, [clubs, loadSquads]);

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
