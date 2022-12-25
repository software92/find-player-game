import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import ClubViews from './components/ClubViews';
import Cover from './components/Cover';
import Header from './components/Header';
import Submission from './components/Submission';

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

const Router = () => (
  <BrowserRouter>
    <Header />
    <Container>
      <ClubViews />
      <Switch>
        <Route path='/submission' component={Submission} />
        <Route path='/' component={Cover} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default Router;
