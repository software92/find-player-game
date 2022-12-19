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
  padding-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const Name = styled.span`
  // margin-left: 10px;
  // margin: auto 0;
  margin: auto 0;
`;

const AutoSearch = ({ searchingPlayers, setValue }) => {
  const pickPlayer = (e) => {
    const name = e.target.innerText;
    setValue(name);
  };
  console.log('search', searchingPlayers);

  return (
    <AutoSearchBox>
      {searchingPlayers.map((player) => {
        const name = player.name.toUpperCase();

        return (
          <PlayerBox key={player.id} onClick={pickPlayer}>
            <Name>{name}</Name>
          </PlayerBox>
        );
      })}
    </AutoSearchBox>
  );
};

export default AutoSearch;
