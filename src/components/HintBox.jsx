import styled from 'styled-components';

const HintList = styled.ul`
  margin-bottom: 40px;
`;
const HintItem = styled.li`
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
`;
const WrongAnswer = styled.h3`
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
`;
const Row = styled.div`
  height: 80px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  margin: 0 auto;
`;
const Hint = styled.div`
  border: 2px solid white;
  border-radius: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;

  &:first-child {
    background: center / 60% no-repeat
      url('https://tmssl.akamaized.net/images/wappen/medium/11.png?lm=1489787850');
  }
  &:nth-child(2) {
    // text-decoration: line-through 7px;
    // background-color: green;
  }
  &:nth-child(3) {
    // background-color: blue;
  }
  &:nth-child(4) {
    // background-color: grey;
  }
  &:last-child {
    background: center / 60% no-repeat
      url('https://tmssl.akamaized.net/images/flagge/small/148.png?lm=1520611569');
  }
`;

const HintBox = ({ hintArr }) => {
  return (
    <HintList>
      {hintArr.map((hint, index) => (
        <HintItem key={index}>
          <WrongAnswer>{hint}</WrongAnswer>
          <Row>
            <Hint />
            <Hint>FW</Hint>
            <Hint>25</Hint>
            <Hint>2</Hint>
            <Hint />
          </Row>
        </HintItem>
      ))}
    </HintList>
  );
};

export default HintBox;
