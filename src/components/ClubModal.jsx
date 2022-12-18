import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { squadsState } from '../atom';

const Squad = styled.ul`
  position: absolute;
  top: 0;
  right: -190px;
  z-index: 1;
  width: 210px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
`;
const PlayerInfo = styled.li`
  height: 35px;
  text-align: left;
  display: flex;
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
`;

const Error = styled.li`
  height: 35px;
  text-align: left;
  display: flex;
  color: inherit;
  background-color: #ebebeb;
`;
const Message = styled.span`
  margin: auto 0;
  margin-left: 10px;
  text-transform: Uppercase;
  font-weight: bold;
`;

// club의 suqad를 나타낼 modal
const ClubModal = ({ id }) => {
  const squads = useRecoilValue(squadsState);

  const squad = squads.filter((squad) => squad.id === Number(id))[0];

  console.log('modal', squad, id);
  return (
    <Squad>
      {squad && squad.squad.length > 0 ? (
        squad.squad.map((player) => (
          <PlayerInfo key={player.id}>
            <Name>{player.name}</Name>
          </PlayerInfo>
        ))
      ) : (
        <Error>
          <Message>Can`t find players</Message>
        </Error>
      )}
    </Squad>
  );
};

export default ClubModal;
