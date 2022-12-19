import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { quizState } from '../atom';
import Cover from './Cover';
import HintBox from './HintBox';

const Container = styled.div`
  width: 40%;
  min-height: 300px;
  border-radius: 15px;
  position: relative;
  margin-bottom: 100px;
`;

const Photo = styled.img`
  width: 160px;
  height: 180px;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  ${(props) => (props.isCorrect ? null : 'filter: blur(13px)')};
`;

const AnswerBox = styled.div`
  width: 85%;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 25px;
`;

const Answer = styled.input`
  width: 70%;
  height: 35px;
  border: 1.3px solid #3b3b3b;
  text-align: center;
  font-size: 20px;
  outline: none;
  margin-bottom: 10px;
  border-radius: 15px;
  &::placeholder {
    color: #979dac;
  }
`;

const Submission = () => {
  const ref = useRef();
  const [value, setValue] = useState('');
  const [hintArr, setHintArr] = useState([]);
  const [isQuizStart, setIsQuizStart] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { id, name, imageUrl, age, positionId, nationalitiesImageUrl } =
    useRecoilValue(quizState);

  const onSubmit = (e) => {
    e.preventDefault();
    const newValue = value.trim();
    if (newValue.length === 0) return;

    setHintArr((prev) => [...prev, newValue]);
    console.log(hintArr);
    setValue('');
  };
  const onChange = () => {
    setValue(ref.current.value);
  };

  return (
    <Container>
      {isQuizStart ? null : <Cover setIsQuizStart={setIsQuizStart} />}
      <AnswerBox>
        <Photo
          draggable={false}
          src={imageUrl || ''}
          alt='player-image'
          isCorrect={isCorrect}
        />
        <form method='get' onSubmit={onSubmit}>
          <Answer
            ref={ref}
            type='text'
            name='player'
            id='player'
            placeholder='Find a player!'
            onChange={onChange}
            value={value}
          />
        </form>
      </AnswerBox>
      <HintBox hintArr={hintArr} />
      <button onClick={() => setHintArr([])}>Hint Reset</button>
    </Container>
  );
};

export default Submission;
