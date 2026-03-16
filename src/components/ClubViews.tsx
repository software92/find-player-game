'B. ŠEŠKO'.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
import styled, { css } from 'styled-components'
import Club from './Club'
import { DB_DEFAULT_DATA } from '../constant'
import useFetchingTeamsDataInLeague from '../hooks/useFetchingTeamsDataInLeague'

interface IClubContainer {
  $isLoading: boolean
}

const ClubContainer = styled.div<IClubContainer>`
  grid-template-columns: repeat(3, 1fr);

  ${props =>
    props.$isLoading
      ? css`
          display: flex;
          background-color: transparent;
          cursor: wait;
        `
      : css`
          display: grid;
          background-color: #8ecae6;
          cursor: auto;
        `}

  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  max-width: 250px;

  height: fit-content;
  border-radius: 15px;

  transition: all 0.5s ease-in-out;

  z-index: 31;

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
      <ClubContainer $isLoading>
        <Loader>
          <span>Loading...</span>
        </Loader>
      </ClubContainer>
    )
  }

  if (error || !teams || teams.length === 0) {
    error && console.error(`팀 정보를 가져올 수 없습니다:`, error)
    return <ClubContainer $isLoading>현재 팀을 찾을 수 없습니다</ClubContainer>
  }

  return (
    <ClubContainer $isLoading={isPending}>
      {teams.map(club => (
        <Club key={club.id} {...club} />
      ))}
    </ClubContainer>
  )
}

export default ClubViews
