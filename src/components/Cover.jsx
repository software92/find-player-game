import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isSquadsLoadingState, quizState, totalPlayerState } from '../atom';

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
  z-index: 1;
`;
const Loader = styled.span`
  font-size: 50px;
  font-weight: bold;
  margin: auto;
`;

const Cover = ({ setIsQuizStart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isSquadsLoading = useRecoilValue(isSquadsLoadingState);
  const totalPlayer = useRecoilValue(totalPlayerState);
  const setQuiz = useSetRecoilState(quizState);

  const extractRandomNumber = (number) => Math.floor(Math.random() * number);

  // 전체 선수목록(totalPlayer)에서 임의의 선수를 선택해 문제 선수로 입력
  const selectPlayer = () => {
    const randomPlayerNumber = extractRandomNumber(totalPlayer.length);
    const randomPlayer = totalPlayer[randomPlayerNumber];

    setQuiz(randomPlayer);
  };

  const handleStartGame = () => {
    setIsLoading(true);

    setTimeout(() => {
      selectPlayer();
      setIsLoading(false);
      setIsQuizStart(true);
    }, 2000);
  };

  return (
    <StartButton onClick={handleStartGame} isWait={isLoading}>
      {isSquadsLoading ? (
        <Loader>Searching players...</Loader>
      ) : isLoading ? (
        <Loader>loading...</Loader>
      ) : (
        <Loader>Game Start</Loader>
      )}
    </StartButton>
  );
};

export default Cover;
