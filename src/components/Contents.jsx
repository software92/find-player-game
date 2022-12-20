import styled from 'styled-components';
import ClubViews from './ClubViews';
import Submission from './Submission';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 750px;
  max-width: 1650px;
  gap: 15px;
  margin: 0 auto;
  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

const Contents = () => {
  return (
    <Container>
      <ClubViews />
      <Submission />
    </Container>
  );
};

export default Contents;
