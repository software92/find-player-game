import { Helmet } from 'react-helmet-async'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import Router from './Router'
import { useEffect } from 'react'
import { getClubss } from './services/clientService'

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

const App = () => {
  // temp: random player를 추출하는 테스트 로직
  useEffect(() => {
    async function setRandomPlayer() {
      const teamList = await getClubss()

      if (!teamList || teamList.length === 0) return

      const getRandomIdx = (length: number) =>
        Math.floor(Math.random() * length)

      const randomSquads = teamList[getRandomIdx(teamList.length)].players
      const randomPlayer = randomSquads[getRandomIdx(randomSquads.length)]

      console.log('teamList', teamList, randomPlayer)
    }

    setRandomPlayer()
  }, [])

  return (
    <div>
      <Helmet>
        <title>Find a football player game</title>
      </Helmet>
      <GlobalStyle />
      <Router />
    </div>
  )
}

export default App
