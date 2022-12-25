import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Router from './Router';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    width: 100%;
    height: 100%;
    background-color: #001d3d;
    color: white;
  }
  a {
    text-decoration: none;
  }
`;

const App = () => {
  return (
    <div>
      <Helmet>
        <title>Find a football player game</title>
      </Helmet>
      <GlobalStyle />
      <Router />
    </div>
  );
};

export default App;
