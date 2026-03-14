import styled from 'styled-components'
import Club from './Club'
import { DB_DEFAULT_DATA } from '../constant'
import useFetchingTeamsDataInLeague from '../hooks/useFetchingTeamsDataInLeague'

interface IClubList {
  $isLoading: boolean
}
const ClubList = styled.div<IClubList>`
  display: ${props => (props.$isLoading ? 'flex' : 'grid')};
  ${props => !props.$isLoading && `grid-template-columns: repeat(3, 1fr);`}

  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  max-width: 250px;
  background-color: ${props => (props.$isLoading ? 'transparent' : '#8ecae6')};
  height: auto;
  border-radius: 15px;

  transition: all 0.5s ease-in-out;
  cursor: ${props => (props.$isLoading ? 'wait' : 'auto')};

  ${props => props.theme.media.tablet} {
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
  const {
    isPending,
    error,
    teamsInLeague: teams,
  } = useFetchingTeamsDataInLeague(DB_DEFAULT_DATA.league)

  if (isPending) {
    return (
      <ClubList $isLoading>
        <Loader>
          <span>Loading...</span>
        </Loader>
      </ClubList>
    )
  }

  if (error || !teams || teams.length === 0) {
    error && console.error(`팀 정보를 가져올 수 없습니다:`, error)
    return <ClubList $isLoading>현재 팀을 찾을 수 없습니다</ClubList>
  }

  return (
    <ClubList $isLoading={isPending}>
      {teams.map(club => (
        <Club key={club.id} {...club} />
      ))}
    </ClubList>
  )
}

export default ClubViews
