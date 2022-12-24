import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { quizState, totalPlayerState } from '../atom';

const RLink = styled(Link)`
  @media screen and (max-width: 650px) {
    width: 100%;
    border-radius: 0;
  }
`;
const StartButton = styled.div`
  width: 500px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 15px;
  &:hover {
    cursor: ${(props) => (props.isWait ? 'wait' : 'pointer')};
  }
  z-index: 1;
  @media screen and (max-width: 650px) {
    width: 100%;
    border-radius: 0;
  }
`;
const Loader = styled.span`
  font-size: 50px;
  font-weight: bold;
  color: white;
  margin: auto;
`;

const Cover = () => {
  const totalPlayer = useRecoilValue(totalPlayerState);
  const setQuiz = useSetRecoilState(quizState);
  const [isTotalPlayer, setIsTotalPlayer] = useState(false);

  const extractRandomNumber = (number) => Math.floor(Math.random() * number);

  // 전체 선수목록(totalPlayer)에서 임의의 선수를 선택해 문제 선수로 입력
  const selectPlayer = () => {
    const randomPlayerNumber = extractRandomNumber(totalPlayer.length);
    const randomPlayer = totalPlayer[randomPlayerNumber];

    setQuiz(randomPlayer);
  };

  const handleStartGame = () => {
    if (isTotalPlayer) return;

    selectPlayer();
  };

  useEffect(() => {
    setIsTotalPlayer(!!totalPlayer && totalPlayer.length > 0);
  }, [totalPlayer]);

  return (
    <RLink to={!isTotalPlayer ? '#' : '/submission'}>
      <StartButton onClick={handleStartGame} isWait={!isTotalPlayer}>
        <Loader>{!isTotalPlayer ? 'Stand by' : 'Game Start'}</Loader>
      </StartButton>
    </RLink>
  );
};

export default Cover;
