import styled from 'styled-components';

const Squad = styled.ul`
  position: absolute;
  top: 0;
  right: -80px;
  z-index: 1;
`;
const Player = styled.li``;

// club의 suqad를 나타낼 modal
const ClubModal = () => {
  return <Squad>Club Modal</Squad>;
};

export default ClubModal;
