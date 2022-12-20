import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getClubs, getSquad } from '../api';
import { clubsState, squadsState } from '../atom';
import Club from './Club';

const ClubList = styled.div`
  min-width: 15%;
  height: 200px;
  ${(props) =>
    props.isClubsLoading
      ? 'display: flex'
      : 'display: grid; grid-template-columns: repeat(3, 1fr);'};
  padding: 10px;
  background-color: #8ecae6;
  border-radius: 15px;
`;

const Loader = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin: auto;
`;

const ClubViews = () => {
  const [isClubsLoading, setIsClubsLoading] = useState(true);
  const [clubs, setClubs] = useRecoilState(clubsState);
  const [squads, setSquads] = useRecoilState(squadsState);

  // api를 사용해 여러 개의 클럽 정보를 가져온다
  const loadClubs = useCallback(async () => {
    const loadClubs = await getClubs();
    setClubs(loadClubs);
    setIsClubsLoading(false);
  }, []);

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
  }, [clubs]);

  // DOM이 처음 업데이트 된 후 최초 한 번만 실행
  useEffect(() => {
    loadClubs();
  }, [loadClubs]);

  // api를 사용해 클럽의 정보를 clubs state에 저장하면 실행
  useEffect(() => {
    if (clubs.length > 0) {
      loadSquads();
    }
  }, [clubs, loadSquads]);

  return (
    <ClubList isClubsLoading={isClubsLoading}>
      {isClubsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        clubs.length > 0 &&
        clubs.map((club) => <Club key={club.id} {...club} />)
      )}
      {/* To be load style 추가 */}
    </ClubList>
  );
};

export default ClubViews;
