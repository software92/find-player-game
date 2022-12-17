import { useState } from 'react';
import styled from 'styled-components';

const StartButtonBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: red;
  border-radius: 15px;
`;
const StartButton = styled.span`
  font-size: 50px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const tempApiData = [
  { id: 1, name: 'FC Seoul' },
  { id: 2, name: 'FC Suwon' },
];

const Cover = ({ setIsStart }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartGame = () => {
    setIsLoading(true);
    console.log(tempApiData);

    // api loading time (temp)
    setInterval(() => {
      setIsStart(true);
      setIsLoading(false);
    }, 5000);
  };

  return (
    <StartButtonBox>
      <StartButton onClick={handleStartGame}>
        {isLoading ? 'loading...' : 'Game Start'}
      </StartButton>
    </StartButtonBox>
  );
};

export default Cover;
