import styled from 'styled-components'
import ClubSquadModal from './ClubSquadModal'
import { useState } from 'react'
import type { IFirebaseTeamDetail } from '../types'
import useDebouncedValue from '../hooks/useDebouncedValue'

const Container = styled.div<{ $isHover: boolean }>`
  position: relative;
  text-align: center;
  padding: 5px;
  cursor: ${props => (props.$isHover ? 'pointer' : 'pointer')};
`

const Emblem = styled.img`
  width: 100%;
  z-index: 0;
  aspect-ratio: 1 / 1;
`

const Club = ({ logo, name, id }: IFirebaseTeamDetail) => {
  const [isHover, setIsHover] = useState(false)
  const onModal = useDebouncedValue(isHover, 500)

  return (
    <Container
      $isHover={isHover}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Emblem src={logo} alt={name} />
      {onModal && isHover && <ClubSquadModal id={id} />}
    </Container>
  )
}

export default Club
