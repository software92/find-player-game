import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { quizState, totalPlayerState } from '../atom';
import AutoSearch from './AutoSearch';
import Cover from './Cover';
import HintBox from './HintBox';

const Container = styled.div`
  width: 40%;
  min-height: 300px;
  border-radius: 15px;
  position: relative;
  margin-bottom: 100px;
`;

const AnswerBox = styled.div`
  width: 85%;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 25px;
  padding-bottom: 15px;
`;
const Photo = styled.img`
  width: 160px;
  height: 180px;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  ${(props) => (props.isCorrect ? null : 'filter: blur(13px)')};
`;

const Answer = styled.input`
  width: 70%;
  height: 35px;
  border: 1.3px solid #3b3b3b;
  text-align: start;
  font-size: 17px;
  font-weight: bold;
  outline: none;
  padding-left: 10px;
  border-radius: 5px;
  &::placeholder {
    color: #979dac;
  }
`;
const Submission = () => {
  const answerRef = useRef();
  const [value, setValue] = useState('');
  const [hintArr, setHintArr] = useState([]);
  const [isQuizStart, setIsQuizStart] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const quiz = useRecoilValue(quizState);
  const totalPlayer = useRecoilValue(totalPlayerState);
  const [searchingPlayers, setSearchingPlayers] = useState([]);

  // 자동완성(AutoSearch)으로 검색된 선수만 submit 허용
  const onSubmit = (e) => {
    e.preventDefault();
    const newValue = value.trim();
    if (newValue.length === 0) return;
    if (searchingPlayers.length === 0) return;

    const isEqual = Object.is(quiz, searchingPlayers[0]);

    const hintObj = { q: quiz, answer: searchingPlayers[0] };
    setHintArr((prev) => [hintObj, ...prev]);

    if (isEqual) {
      setIsCorrect(true);
    }
  };
  const onChange = () => {
    setValue(answerRef.current.value.toUpperCase());
  };

  // 전체 선수목록(totalPlayer)에서 특정 선수 filtering
  const findPlayers = useCallback(() => {
    const filterPlayer = totalPlayer.filter((player) => {
      const name = player.name.toUpperCase();
      return name.includes(value.trim());
    });
    setSearchingPlayers(filterPlayer);
  }, [totalPlayer, value]);

  // 2개 이상의 문자를 입력했을 때부터, filtering
  useEffect(() => {
    if (value.length > 2) {
      findPlayers();
    }
  }, [value, findPlayers]);

  // console.log('quiz', quiz);
  return (
    <Container>
      {isQuizStart ? null : <Cover setIsQuizStart={setIsQuizStart} />}
      <AnswerBox>
        <Photo
          draggable={false}
          src={quiz.image || ''}
          alt='player-image'
          isCorrect={isCorrect}
        />
        <form method='get' onSubmit={onSubmit}>
          <Answer
            ref={answerRef}
            type='text'
            name='player'
            id='player'
            placeholder='Write a Full-name'
            onChange={onChange}
            value={value}
          />

          {value.length > 2 && (
            <AutoSearch
              searchingPlayers={searchingPlayers}
              setValue={setValue}
            />
          )}
        </form>
      </AnswerBox>
      {hintArr.length > 0 && <HintBox hintArr={hintArr} />}
    </Container>
  );
};

export default Submission;
