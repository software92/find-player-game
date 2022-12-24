import styled from 'styled-components';

const Squad = styled.ul`
  position: absolute;
  top: 0;
  right: -210px;
  width: 230px;
  height: 300px;
  z-index: 3;
  border: 2px solid grey;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow-y: scroll;
`;
const PlayerInfo = styled.li`
  line-height: 30px;
  text-align: left;
  color: inherit;
  background-color: #ebebeb;
  &:nth-child(2n) {
    background-color: #c0c0c0;
  }
`;
const Name = styled.span`
  margin: auto 0;
  margin-left: 10px;
  text-transform: Uppercase;
  font-weight: bold;
  text-shadow: 1px 1px 5px black;
`;

const Loader = styled.li`
  height: 35px;
  text-align: left;
  display: flex;
  color: inherit;
  background-color: #ebebeb;
`;
const Span = styled.span`
  margin: auto 0;
  margin-left: 10px;
  text-transform: Uppercase;
  font-weight: bold;
  text-shadow: 1px 1px 5px black;
`;

// 클럽의 등록된 선수를 보여주는 Modal
const ClubSquadModal = ({ isClubSquadLoading, squad }) => (
  <Squad isClubSquadLoading={isClubSquadLoading}>
    {!isClubSquadLoading ? (
      squad.squad.length > 0 &&
      squad.squad.map((player) => (
        <PlayerInfo key={player.id}>
          <Name>{player.name}</Name>
        </PlayerInfo>
      ))
    ) : (
      <Loader>
        <Span>Loading...</Span>
      </Loader>
    )}
  </Squad>
);

export default ClubSquadModal;
