import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  height: 55%;
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
const Link = styled.a`
  color: red;
  font-weight: bold;
`;

const Header = () => {
  return (
    <Container>
      <Title>Find a your player !</Title>
      <SubContainer>
        <Text>
          {'original: '}
          <Link
            href='https://playfootball.games/who-are-ya/world-cup'
            target='_blank'
          >
            https://playfootball.games/who-are-ya/world-cup
          </Link>
        </Text>
      </SubContainer>
    </Container>
  );
};

export default Header;
