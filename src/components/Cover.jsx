import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { quizState, totalSquadState } from '../atom';

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

const Cover = ({ setIsQuizStart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const totalSquad = useRecoilValue(totalSquadState);
  const setQuiz = useSetRecoilState(quizState);

  const extractRandomNumber = (number) => Math.floor(Math.random() * number);

  const selectPlayer = () => {
    const randomSquadNumber = extractRandomNumber(totalSquad.length);
    const randomSquad = totalSquad[randomSquadNumber];
    const randomPlayerNumber = extractRandomNumber(randomSquad.length);
    const randomPlayer = totalSquad[randomSquadNumber][randomPlayerNumber];
    const {
      id,
      name,
      image,
      age,
      positions: {
        first: { id: positionId },
      },
      nationalities: [born],
    } = randomPlayer;

    const playerObj = {
      id,
      name,
      imageUrl: image,
      age,
      positionId,
      nationalitiesImageUrl: born.image,
    };
    setQuiz(playerObj);
  };

  const handleStartGame = () => {
    if (isLoading) return;
    setIsLoading(true);

    // api loading time (temp)
    setTimeout(() => {
      selectPlayer();
      setIsLoading(false);
      setIsQuizStart(true);
    }, 2000);
  };

  return (
    <StartButton onClick={handleStartGame} isWait={isLoading}>
      {isLoading ? <span>loading...</span> : <span>Game Start</span>}
    </StartButton>
  );
};

export default Cover;
