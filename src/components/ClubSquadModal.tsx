import styled from 'styled-components'
import useFetchingTeamSquadData from '../hooks/useFetchingTeamSquadData'
import { DB_DEFAULT_DATA } from '../constant'
import { useEffect, useRef } from 'react'

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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: clip;
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
  text-transform: Uppercase;
  font-weight: bold;
  text-shadow: 1px 1px 5px black;
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
const Span = styled.span`
  margin: auto 0;
  text-transform: Uppercase;
  font-weight: bold;
  text-shadow: 1px 1px 3px gray;
`

// 클럽의 등록된 선수를 보여주는 Modal
const ClubSquadModal = ({
  id,
  parentRef,
}: {
  id: number
  parentRef: React.RefObject<HTMLImageElement>
}) => {
  const { isPending, error, squad } = useFetchingTeamSquadData(
    DB_DEFAULT_DATA.league,
    id,
  )
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!listRef.current || !parentRef.current || isPending) return

    const { y } = parentRef.current.getBoundingClientRect()
    const playListHeight = listRef.current.clientHeight
    const screenHeight = window.innerHeight

    const isListToTransfer = !(playListHeight < screenHeight - y)

    listRef.current.style.transform = isListToTransfer
      ? 'translateY(-80%)'
      : 'none'
  }, [squad, isPending, parentRef])

  return (
    <PlayerList ref={listRef}>
      {isPending ? (
        <Message message='Loading...' />
      ) : error || !squad?.length ? (
        <Message message='현재 선수 목록을 가져올 수 없습니다' />
      ) : (
        squad.map((player, idx) => <Player key={idx} name={player.name} />)
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

function Player({ name }: { name: string }) {
  return (
    <PlayerRow>
      <Name>{name}</Name>
    </PlayerRow>
  )
}
