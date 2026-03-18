import styled from 'styled-components'
import ClubSquadModal from './ClubSquadModal'
import { useRef, useState } from 'react'
import type { IFirebaseTeamDetail } from '../types'
import useDebouncedValue from '../hooks/useDebouncedValue'

const Container = styled.div<{ $isHover: boolean }>`
  min-width: 70px;
  aspect-ratio: 1/1;
  position: relative;
  text-align: center;
  padding: 5px;
  cursor: ${props => (props.$isHover ? 'pointer' : 'auto')};
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    z-index: 5;
  }
`

const Emblem = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: block; /* 하단 여백 제거 */
`

const Club = ({ logo, name, id }: IFirebaseTeamDetail) => {
  const [isHover, setIsHover] = useState(false)
  const onLazyModal = useDebouncedValue(isHover, 300)
  const parentRef = useRef<HTMLImageElement>(null)

  return (
    <Container
      $isHover={isHover}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Emblem src={logo} alt={name} ref={parentRef} />
      {onLazyModal && isHover && (
        <ClubSquadModal id={id} parentRef={parentRef} />
      )}
    </Container>
  )
}

export default Club
