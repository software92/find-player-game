import styled from 'styled-components';
import ClubViews from './ClubViews';
import Submission from './Submission';

const Container = styled.div`
  display: flex;
  justify-content: center;
  min-width: 800px;
  max-width: 1650px;
  gap: 15px;
  margin: 0 auto;
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
