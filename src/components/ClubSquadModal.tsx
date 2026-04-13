import styled from 'styled-components'
import useFetchingTeamSquadData from '../hooks/useFetchingTeamPlayersData'
import { useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { inputState } from '@/atoms/quizState'

interface IClubSquadModalProps {
  id: number
  parentRef: React.RefObject<HTMLImageElement>
  offModal: () => void
}

const PlayerList = styled.ul`
  position: absolute;
  top: 0;
  left: 100%;
  width: 230px;
  max-height: 300px;
  height: fit-content;
  z-index: 3;
  border: 2px solid grey;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow-y: auto;
`
const PlayerRow = styled.li`
  line-height: 30px;
  text-align: left;
  color: inherit;
  background-color: #ebebeb;

  &:nth-child(2n) {
    background-color: #c0c0c0;
  }
  &:hover {
    text-decoration: underline;
  }
`
const Name = styled.span`
  margin: auto 0;
  margin-left: 10px;
  font-weight: bold;
  text-shadow: 1px 1px 5px black;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Loader = styled.li`
  height: 35px;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;
  background-color: #ebebeb;

  & span {
    color: gray;
    width: 100%;
    font-size: 0.9rem;
    margin-left: 10px;
  }
`

// 클럽의 등록된 선수를 보여주는 Modal
const ClubSquadModal = ({ id, parentRef, offModal }: IClubSquadModalProps) => {
  const setValue = useSetRecoilState(inputState)
  const {
    isPending,
    error,
    playerInTeam: players,
  } = useFetchingTeamSquadData(id)
  const listRef = useRef<HTMLUListElement>(null)

  const handleClick = (name: string) => {
    setValue(name)
    offModal()
  }

  useEffect(() => {
    if (!listRef.current || !parentRef.current || isPending) return

    const { bottom } = parentRef.current.getBoundingClientRect()
    const playListHeight = listRef.current.clientHeight
    const screenHeight = window.innerHeight

    const isListToTransfer = screenHeight - bottom < playListHeight

    listRef.current.style.transform = isListToTransfer
      ? 'translateY(-80%)'
      : 'none'
  }, [players, isPending])

  return (
    <PlayerList ref={listRef}>
      {isPending ? (
        <Message message='Loading...' />
      ) : error || !players?.length ? (
        <Message message='현재 선수 목록을 가져올 수 없습니다' />
      ) : (
        players.map(player => (
          <Player
            key={player.id}
            name={player.name}
            handleClick={() => handleClick(player.name)}
          />
        ))
      )}
    </PlayerList>
  )
}

export default ClubSquadModal

function Message({ message }: { message: string; isLoading?: boolean }) {
  return (
    <Loader>
      <span>{message}</span>
    </Loader>
  )
}

function Player({
  name,
  handleClick,
}: {
  name: string
  handleClick: () => void
}) {
  return (
    <PlayerRow onClick={handleClick}>
      <Name>{name}</Name>
    </PlayerRow>
  )
}
