import styled from 'styled-components';
import { getClubs } from '../api';
import useFetchingClubsData from '../hooks/useFetchingClubsData';
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
  // View, logic을 처리하는 부분을 구분 (코드리뷰)
  // custom hook을 사용해 로직과 화면을 처리하는 컴포넌트를 분리
  const [isClubsLoading, clubs] = useFetchingClubsData(['clubs'], getClubs);

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
