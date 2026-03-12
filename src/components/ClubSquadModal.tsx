import styled from 'styled-components'
import useFetchingTeamSquadData from '../hooks/useFetchingTeamSquadData'
import { DB_DEFAULT_DATA } from '../constant'

const Squad = styled.ul`
  position: absolute;
  top: 0;
  right: -210px;
  width: 230px;
  max-height: 300px;
  z-index: 3;
  border: 2px solid grey;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow-y: auto;
`
const PlayerInfo = styled.li`
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
const ClubSquadModal = ({ id }: { id: number }) => {
  const { isPending, error, squad } = useFetchingTeamSquadData(
    DB_DEFAULT_DATA.league,
    id,
  )

  if (isPending)
    return (
      <Squad>
        <Loader>
          <Span>Loading...</Span>
        </Loader>
      </Squad>
    )

  if (error || !squad || squad?.length === 0) {
    console.error('현재 선수 목록을 가져올 수 없습니다', error)
    return (
      <Squad>
        <Loader>
          <span>현재 선수 목록을 가져올 수 없습니다</span>
        </Loader>
      </Squad>
    )
  }

  return (
    <Squad>
      {squad.map((player, idx) => (
        <PlayerInfo key={idx}>
          <Name>{player.name}</Name>
        </PlayerInfo>
      ))}
    </Squad>
  )
}

export default ClubSquadModal
