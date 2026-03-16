import { useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { quizState, totalPlayerState } from '../atom'
import AutoSearch from '../components/AutoSearch'
import HintBox from '../components/HintBox'
import { Navigate } from 'react-router-dom'
import routerPath from '../constant/routerPath'
import { DB_DEFAULT_DATA } from '../constant'
import type { IFirebasePlayer } from '../types'

import useDebouncedValue from '../hooks/useDebouncedValue'
import useFetchingPlayersDataInLeague from '../hooks/useFetchingPlayersDataInLeague'

interface IHint {
  q: IFirebasePlayer
  a: IFirebasePlayer
}

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

const Input = styled.input`
  width: 70%;
  height: 35px;
  border: 1.3px solid #3b3b3b;
  text-align: start;
  font-size: 17px;
  font-weight: bold;
  outline: none;
  padding-left: 10px;
  border-radius: 5px;
  &::placeholder {
    color: #979dac;
  }
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
    alert('현재 문제가 없습니다. 문제를 다시 설정합니다')

    return <Navigate to={routerPath.HOME} />
  }

  // 자동완성(AutoSearch)으로 검색된 선수만 submit 허용

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

interface IForm {
  quiz: IFirebasePlayer
  squad: IFirebasePlayer[]
  disabled: boolean
  setIsCorrect: React.Dispatch<boolean>
  setHintArr: React.Dispatch<React.SetStateAction<IHint[]>>
}

function SearchForm({
  quiz,
  squad,
  disabled,
  setIsCorrect,
  setHintArr,
}: IForm) {
  const [value, setValue] = useState('')
  const debouncedValue = useDebouncedValue(value, 500)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value.toUpperCase())
  }

  // hint: age number position club
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!quiz || !value || disabled) return
    if (filteredPlayerss.length === 0) return

    const selectPlayer = filteredPlayerss[0]

    const hintObj: IHint = { q: quiz, a: selectPlayer }

    setHintArr(prev => {
      const checkForDuplicate = prev.find(hint => hint.a.id === selectPlayer.id)

      if (checkForDuplicate) {
        alert('이미 입력한 이름입니다. 다른 이름을 입력해주세요.')
        return prev
      }

      return [hintObj, ...prev]
    })
    setValue('')

    if (quiz.id === selectPlayer.id) {
      setIsCorrect(true)
      setValue(selectPlayer.name.toUpperCase())
      return
    }
  }

  const filteredPlayerss = useMemo(() => {
    if (disabled) return []
    if (!squad || debouncedValue.length < 3) return []

    return squad.filter(player => {
      const name = player.name.toUpperCase()
      return name.includes(debouncedValue.trim())
    })
  }, [squad, debouncedValue, disabled])

  return (
    <form method='get' onSubmit={onSubmit}>
      <Input
        disabled={disabled}
        type='text'
        name='player'
        id='player'
        placeholder='Write a Full-name'
        onChange={onChange}
        value={value}
        autoComplete='off'
      />
      {debouncedValue.length > 2 && (
        <AutoSearch filteredPlayers={filteredPlayerss} setValue={setValue} />
      )}
    </form>
  )
}

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
