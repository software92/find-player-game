import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { quizState } from '../atom';
import Cover from './Cover';

const Container = styled.div`
  width: 40%;
  min-height: 300px;
  background-color: red;
  border-radius: 15px;
  position: relative;
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

const HintContainer = styled.div`
  margin-bottom: 20px;
`;
const WrongAnswer = styled.h3`
  font-size: 30px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 10px;
`;
const HintList = styled.ul``;
const HintBox = styled.li`
  width: 95%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  border: 1px solid white;
  margin: 0 auto;
`;
const Hint = styled.div`
  border: 1px solid white;
  font-size: 20px;
  text-align: center;
`;
const Img = styled.img`
  width: 50%;
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

  console.log(id, name, imageUrl, age, positionId, nationalitiesImageUrl);

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
      <HintList>
        {hintArr.map((hint, index) => (
          <HintContainer key={index}>
            <WrongAnswer>{hint}</WrongAnswer>
            <HintBox>
              <Hint>
                <Img src='https://tmssl.akamaized.net/images/wappen/medium/11.png?lm=1489787850' />
              </Hint>
              <Hint>FW</Hint>
              <Hint>25</Hint>
              <Hint>2</Hint>
              <Hint>Germany</Hint>
            </HintBox>
          </HintContainer>
        ))}
      </HintList>
      <button onClick={() => setHintArr([])}>Restart</button>
    </Container>
  );
};

export default Submission;
