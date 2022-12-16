import { useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 35%;
  border: 1px solid red;
  background-color: red;
  border: 1px solid black;
`;

const Photo = styled.div`
  // 임시 이미지
  background: center / 75% no-repeat
    url('https://img.a.transfermarkt.technology/portrait/medium/74842-1663065102.jpg?lm=1');
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 10px;
`;

const AnswerBox = styled.div`
  width: 85%;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
`;

const Answer = styled.input`
  width: 70%;
  height: 35px;
  border: none;
  text-align: center;
  font-size: 20px;
  outline: none;
  margin-bottom: 10px;
  &::placeholder {
    color: #979dac;
  }
`;

const HintBox = styled.div``;

const Submission = () => {
  const ref = useRef();
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    setValue('');
  };
  const onChange = () => {
    setValue(ref.current.value);
  };

  return (
    <Container>
      <AnswerBox>
        <Photo />
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
      <HintBox></HintBox>
    </Container>
  );
};

export default Submission;
