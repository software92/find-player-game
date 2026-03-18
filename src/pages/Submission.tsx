import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { quizState, totalPlayerState } from '../atom'
import HintBox from '../components/HintBox'
import { Navigate } from 'react-router-dom'
import routerPath from '../constant/routerPath'
import { DB_DEFAULT_DATA } from '../constant'
import type { IHint } from '../types'

import useFetchingPlayersDataInLeague from '../hooks/useFetchingPlayersDataInLeague'
import SearchForm from '@/components/SearchForm'

const Container = styled.div`
  width: 500px;
  min-height: 300px;
  border-radius: 15px;
  margin-bottom: 50px;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`

const FormContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 15px;
  padding-bottom: 15px;

  z-index: 10;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    border-radius: 0;
  }
`
const Photo = styled.img<{ $isCorrect: boolean }>`
  width: 160px;
  height: 180px;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  ${props => (props.$isCorrect ? null : 'filter: blur(13px)')};
`

const Submission = () => {
  const quiz = useRecoilValue(quizState)
  const {
    isPending,
    error,
    playersInLeague: squad,
  } = useFetchingPlayersDataInLeague(DB_DEFAULT_DATA.league)

  const [hintArr, setHintArr] = useState<IHint[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const totalPlayer = useRecoilValue(totalPlayerState)

  if (quiz === null) {
    alert('현재 문제가 준비되지 않았습니다. 문제를 다시 설정합니다.')

    return <Navigate to={routerPath.HOME} />
  }

  if (isPending)
    return (
      <Container>
        <Loader />
      </Container>
    )

  return (
    <Container>
      <FormContainer>
        <Photo
          draggable={false}
          src={quiz?.photo || null}
          alt={`${quiz.name}`}
          $isCorrect={isCorrect}
        />
        <SearchForm
          squad={squad}
          quiz={quiz}
          disabled={isCorrect}
          setIsCorrect={setIsCorrect}
          setHintArr={setHintArr}
        />
      </FormContainer>
      {hintArr && hintArr?.length > 0 && <HintBox hintArr={hintArr} />}
    </Container>
  )
}

export default Submission

function Loader() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignContent: 'center',
        backgroundColor: 'skyblue',
      }}
    >
      <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>Loading...</span>
    </div>
  )
}
