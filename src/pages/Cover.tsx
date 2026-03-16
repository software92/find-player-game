import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { quizState, totalPlayerState } from '../atom'

import type { IPlayer } from '../types'
import { DB_DEFAULT_DATA } from '../constant'
import useFetchingPlayersDataInLeague from '../hooks/useFetchingPlayersDataInLeague'

interface IStartButton {
  $isWait: boolean
}

const Button = styled.button<IStartButton>`
  border: 1px solid white;
  width: 500px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 15px;
  &:hover {
    cursor: ${props => (props.$isWait ? 'wait' : 'pointer')};
  }
  z-index: 1;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`
const Span = styled.span`
  font-size: 50px;
  font-weight: bold;
  color: white;
  margin: auto;
`

// TODO: 임시 스쿼드 -> 전체 팀 스쿼드 변경
const Cover = () => {
  const [player, setPlayer] = useState<IPlayer>(null)
  const navigate = useNavigate()
  const setQuiz = useSetRecoilState(quizState)

  // 임시 스쿼드 목록
  const {
    isPending,
    error,
    playersInLeague: squad,
  } = useFetchingPlayersDataInLeague(DB_DEFAULT_DATA.league)

  const selectPlayer = () => {
    if (!squad || squad?.length === 0) return

    const randomIdx = extractRandomNumber(squad.length)

    setPlayer(squad[randomIdx])
    setQuiz(squad[randomIdx])
  }

  useEffect(() => {
    selectPlayer()
  }, [squad])

  const handleClick = () => {
    if (error) return alert('현재 서비스를 이용할 수 없습니다')
    if (isPending || !player) return

    navigate('/submission')
  }

  return (
    <Button $isWait={isPending} onClick={handleClick}>
      <Span>
        {!error
          ? isPending || !player
            ? 'Stand by'
            : 'Game Start'
          : '현재 서비스를 이용할 수 없습니다'}
      </Span>
    </Button>
  )
}

export default Cover

function extractRandomNumber(number: number) {
  return Math.floor(Math.random() * number)
}
