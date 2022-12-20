import styled from 'styled-components';

const AutoSearchBox = styled.ul`
  width: 70%;
  max-height: 200px;
  overflow-y: scroll;
  color: red;
  margin: 0 auto;
  border: 1.3px solid rgba(59, 59, 59, 0.4);
`;
const PlayerBox = styled.li`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  font-size: 15spx;
  font-weight: bold;
  color: rgba(59, 59, 59, 0.5);
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const ClubEmblem = styled.img`
  width: 25px;
  height: 25px;
`;
const Name = styled.span`
  margin: auto 0;
`;

const AutoSearch = ({ searchingPlayers, setValue }) => {
  const pickPlayer = (e) => {
    const {
      target: { innerText: name },
    } = e;

    setValue(name);
  };

  return (
    <AutoSearchBox>
      {searchingPlayers.map((player) => {
        const name = player.name.toUpperCase();
        const imageUrl = player.nationalities[0].image;

        return (
          <PlayerBox key={player.id} onClick={pickPlayer}>
            <ClubEmblem src={imageUrl} />
            <Name>{name}</Name>
          </PlayerBox>
        );
      })}
    </AutoSearchBox>
  );
};

export default AutoSearch;
