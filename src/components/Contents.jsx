import styled from 'styled-components';
import ClubViews from './ClubViews';

const Container = styled.div`
  display: flex;
  justify-content: center;
  min-width: 800px;
`;

const Contents = () => {
  return (
    <Container>
      <ClubViews />
    </Container>
  );
};

export default Contents;
