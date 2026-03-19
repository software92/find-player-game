import useFetchingPlayersDataInLeague from './useFetchingPlayersDataInLeague'
import { useRecoilState } from 'recoil'
import { quizState } from '@/atoms/quizState'
import { useCallback } from 'react'
import { DEFAULT_API_PARAMS } from '@/constant'

const useQuizGenerator = () => {
  const [prevQuiz, setQuiz] = useRecoilState(quizState)
  const { playersInLeague: squads } = useFetchingPlayersDataInLeague(
    DEFAULT_API_PARAMS.league,
  )

  const generateRandomPlayer = useCallback(() => {
    if (!squads || squads.length === 0) return

    const availablePlayers = squads.filter(player => player.id !== prevQuiz?.id)
    const players = availablePlayers.length > 0 ? availablePlayers : squads

    const randomIdx = Math.floor(Math.random() * players.length)
    const nextPlayer = players[randomIdx]

    setQuiz(nextPlayer)
  }, [squads])

  return { generateRandomPlayer }
}

export default useQuizGenerator
