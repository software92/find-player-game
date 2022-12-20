import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Main from './components/Main';

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
`;

const App = () => {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Main />
    </RecoilRoot>
  );
};

export default App;
