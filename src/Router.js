import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cover from './components/Cover';
import Submission from './components/Submission';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/submission'>
        <Submission />
      </Route>
      <Route path='/'>
        <Cover />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
