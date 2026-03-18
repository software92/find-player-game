import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { quizState } from '@/atoms/quizState'
import useQuizGenerator from '@/hooks/useQuizGenerator'
import routerPath from '@/constant/routerPath'

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
export const Cover = () => {
  const quiz = useRecoilValue(quizState)
  const navigate = useNavigate()

  const { generateRandomPlayer } = useQuizGenerator()

  useEffect(() => {
    if (!quiz) {
      generateRandomPlayer()
    }
  }, [generateRandomPlayer, quiz])

  const handleClick = () => {
    if (!quiz) return

    navigate(routerPath.SUBMISSION)
  }

  return (
    <Button $isWait={!quiz} onClick={handleClick}>
      <Span>{!quiz ? '문제를 준비 중입니다' : 'Game Start'}</Span>
    </Button>
  )
}

export function RazyCover() {
  return (
    <Button $isWait={true}>
      <Span>Stand by</Span>
    </Button>
  )
}
