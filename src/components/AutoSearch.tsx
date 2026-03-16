import styled from 'styled-components'
import type { IFirebasePlayer } from '../types'

const AutoSearchBox = styled.ul`
  width: 70%;
  max-height: 200px;
  overflow-y: auto;
  color: red;
  margin: 0 auto;
  border: 1.3px solid rgba(59, 59, 59, 0.4);
  background-color: white;
  border-radius: 0 0 5px 5px;
`
const PlayerBox = styled.button`
  width: 100%;
  height: 35px;
  font-size: 15px;
  font-weight: bold;
  color: rgba(59, 59, 59, 0.5);
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  background-color: white;
  box-shadow: 0px 3px 12px black;
  &:hover {
    cursor: pointer;
  }
`
const ClubEmblem = styled.img`
  width: 25px;
  height: 25px;
`
const Name = styled.span`
  margin: auto 0;
`
interface IAutoSearchProps {
  filteredPlayers: IFirebasePlayer[]
  setValue: React.Dispatch<string>
}

// 쓰로틀링 or 디바운싱(이게 맞는거 같은??, 부모 컴포넌트)
// 자동완성된 리스트에서 선수를 선택하면 입력창의 value를 해당 선수 이름으로 변경
const AutoSearch = ({ filteredPlayers, setValue }: IAutoSearchProps) => {
  const pickPlayer = (name: string) => {
    setValue(name)
  }

  return (
    filteredPlayers?.length > 0 && (
      <AutoSearchBox>
        {filteredPlayers.map(player => {
          const name = player.name.toUpperCase()

          return (
            <PlayerBox
              key={player.id}
              type='button'
              onClick={() => pickPlayer(name)}
            >
              <ClubEmblem
                src={player.teamLogo || ''}
                alt={player.teamId.toString()}
              />
              <Name>{name}</Name>
            </PlayerBox>
          )
        })}
      </AutoSearchBox>
    )
  )
}

export default AutoSearch
