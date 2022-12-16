import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Header from './components/Header';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    width: 100vw;
    height: 100%;
    background-color: #001d3d;
    color: white;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
    </>
  );
};

export default App;
