import styled from 'styled-components';
import Router from '../Router';
import ClubViews from './ClubViews';

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
      <Router />
    </Container>
  );
};

export default Contents;
