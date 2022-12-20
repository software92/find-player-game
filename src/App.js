import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from 'react-query';
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Helmet>
          <title>Find a football player game</title>
        </Helmet>
        <GlobalStyle />
        <Main />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
