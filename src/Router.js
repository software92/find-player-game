import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cover from './components/Cover';
import Submission from './components/Submission';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/submission' component={Submission} />
      <Route path='/' component={Cover} />
    </Switch>
  </BrowserRouter>
);

export default Router;
