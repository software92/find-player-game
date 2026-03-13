import styled from 'styled-components'
import useFetchingClubsData from '../hooks/useFetchingClubsData'
import Club from './Club'
import { DB_DEFAULT_DATA } from '../constant'

interface IClubList {
  $isLoading: boolean
}
const ClubList = styled.div<IClubList>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 250px;
  height: auto;
  ${props =>
    props.$isLoading
      ? 'display: flex'
      : 'display: grid; grid-template-columns: repeat(3, 1fr);'};
  padding: 10px;
  background-color: #8ecae6;
  border-radius: 15px;
  &:hover {
    cursor: ${props => (props.$isLoading ? 'wait' : 'cursor')};
  }
  ${props => props.theme.media.tablet} {
    background: black;
    display: none;
  }
`

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    font-size: 30px;
    font-weight: bold;
    margin: auto;
  }
`

const ClubViews = () => {
  const { isPending, error, clubs } = useFetchingClubsData(
    DB_DEFAULT_DATA.league,
  )

  console.log('clubs', clubs)

  if (error) {
    console.error(`팀 정보를 가져올 수 없습니다:`, error)
    return (
      <div>
        <span>팀 정보를 가져올 수 없습니다</span>
      </div>
    )
  }

  return (
    <ClubList $isLoading={isPending}>
      {isPending ? (
        <Loader>
          <span>Loading...</span>
        </Loader>
      ) : (
        clubs &&
        clubs.length > 0 &&
        clubs.map(club => <Club key={club.id} {...club} />)
      )}
    </ClubList>
  )
}

export default ClubViews
