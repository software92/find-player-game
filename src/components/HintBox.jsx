import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { quizState, squadsState } from '../atom';

const HintList = styled.ul`
  margin-bottom: 40px;
`;
const HintItem = styled.li`
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
`;
const WrongAnswer = styled.h3`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
`;
const Row = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const Hint = styled.div`
  border: 2px solid white;
  border-radius: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  font-weight: bold;
  background-color: ${(props) => (props.isEqual ? '#06d6a0' : '#8b8c89')};
`;

const ClubEmblem = styled.img`
  width: 50%;
`;
const Position = styled.div``;
const Age = styled.div``;
const Nation = styled.img`
  width: 60%;
  border: 0.5px solid black;
`;

const HintBox = ({ hintArr }) => {
  const getPosition = (num) => {
    return num === 1
      ? 'GK'
      : num < 6
      ? 'DF'
      : num < 11
      ? 'MF'
      : num < 15
      ? 'FW'
      : '--';
  };
  const isEqual = (a, b) => (a === b ? true : false);

  return (
    <HintList>
      {hintArr.map((hint, index) => {
        const {
          age: age1,
          clubId: clubId1,
          clubImage: clubImage1,
          image: profileImage1,
          name: name1,
          nationalities: [{ id: countryId1, image: countryImage1 }],
          positions: {
            first: { id: positionId1 },
          },
        } = hint.answer;

        const {
          age: age2,
          clubId: clubId2,
          nationalities: [{ id: countryId2 }],
          positions: {
            first: { id: positionId2 },
          },
        } = hint.q;

        return (
          <HintItem key={index}>
            <WrongAnswer>{name1}</WrongAnswer>
            <Row>
              <Hint isEqual={isEqual(clubId1, clubId2)}>
                <ClubEmblem src={clubImage1} />
              </Hint>
              <Hint isEqual={isEqual(positionId1, positionId2)}>
                <Position>{getPosition(positionId1)}</Position>
              </Hint>
              <Hint isEqual={isEqual(age1, age2)}>
                <Age>{`${age1} ${
                  age2 > age1 ? '☝' : age2 < age1 ? '👇' : ''
                }`}</Age>
              </Hint>
              <Hint isEqual={isEqual(countryId1, countryId2)}>
                <Nation src={countryImage1} />
              </Hint>
            </Row>
          </HintItem>
        );
      })}
    </HintList>
  );
};

export default HintBox;
