import styled from 'styled-components'
import ClubSquadModal from './ClubSquadModal'
import { useState } from 'react'
import type { ITeamDetail } from '../types'

const Container = styled.div`
  position: relative;
  text-align: center;
  padding: 5px;
`

const Emblem = styled.img`
  width: 100%;
  z-index: 0;
  aspect-ratio: 1 / 1;
`

const Club = ({ logo, name, id }: ITeamDetail) => {
  const [isHover, setIsHover] = useState(false)

  if (!logo || !name) return null

  return (
    <Container
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Emblem src={logo} alt={name} />
      {isHover && <ClubSquadModal id={id} />}
    </Container>
  )
}

export default Club
