import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px auto;
`;
const SubContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  background-color: #f9c74f;
  font-size: 16px;
`;

const Text = styled.span`
  margin: auto;
`;
const ReferenceLink = styled.a`
  color: red;
  font-weight: bold;
`;

const HomeLink = styled(Link)`
  color: white;
  font-size: 40px;
  font-weight: bold;
  height: 55%;
`;

const Header = () => {
  return (
    <Container>
      <HomeLink to='/'>Find a your player !</HomeLink>
      <SubContainer>
        <Text>
          {'original: '}
          <ReferenceLink
            href='https://playfootball.games/who-are-ya/world-cup'
            target='_blank'
          >
            https://playfootball.games/who-are-ya/world-cup
          </ReferenceLink>
        </Text>
      </SubContainer>
    </Container>
  );
};

export default Header;
