import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import Header from '../Header'
import ClubViews from '../ClubViews'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1280px;
  gap: 15px;
  margin: 0 auto;
  padding: 0 20px;
  @media screen and (max-width: 750px) {
    width: 100%;
  }
`

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
`

function RootLayout() {
  return (
    <>
      <Helmet>
        <title>Find a football player game</title>
      </Helmet>
      <Header />
      <GlobalStyle />
      <Container>
        <ClubViews />
        <Outlet />
      </Container>
    </>
  )
}
export default RootLayout
