import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { totalSquadState } from '../atom';

const StartButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: red;
  border-radius: 15px;
  &:hover {
    cursor: ${(props) => (props.isWait ? 'wait' : 'pointer')};
  }
  & > * {
    font-size: 50px;
    font-weight: bold;
  }
`;

const Cover = ({ setIsStart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const totalSquad = useRecoilValue(totalSquadState);

  const selectPlayer = () => {
    const totalSquadNumber = totalSquad.length;
    const randomSquadNumber = Math.floor(Math.random() * totalSquadNumber);
    const randomSquad = totalSquad[randomSquadNumber];
    const randomPlayerNumber = Math.floor(Math.random() * randomSquad.length);

    const randomPlayer = totalSquad[randomSquadNumber][randomPlayerNumber].name;
    console.log(randomPlayer);
  };

  const handleStartGame = () => {
    if (isLoading) return;
    setIsLoading(true);

    // api loading time (temp)
    setTimeout(() => {
      selectPlayer();
      setIsLoading(false);
      setIsStart(true);
    }, 2000);
  };

  return (
    <StartButton onClick={handleStartGame} isWait={isLoading}>
      {isLoading ? <span>loading...</span> : <span>Game Start</span>}
    </StartButton>
  );
};

export default Cover;
