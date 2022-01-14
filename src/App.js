import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getBoardgamelist } from './api/getBoardgamelist';
import { BoardgameHeader, BoardgameHeaderRow, BoardgameRow } from './entities';
import { Arrow } from './shared';
import { compare, fitRange, nullToInfinity, pick, pipe, sortDirection } from './shared/utils';

function App() {

  const headers = [{ name: 'Имя', id: 'name' }, { name: 'min', id: 'minPlayers' }, { name: 'max', id: 'maxPlayers' }];

  const [boardgamesList, setBoardgamesList] = useState(() => getBoardgamelist().slice().sort(pipe(pick('name'), compare)));
  const [sortedBoardgamesList, setSortedBoardgamesList] = useState(boardgamesList);
  const [activeHeader, setActiveHeader] = useState(headers[0]);
  const [isAscending, setIsAscending] = useState(true);
  const [filterNumber, setFilterNumber] = useState('');

  useEffect(() => {
    console.log({ filterNumber });
    setSortedBoardgamesList(boardgamesList
      .slice()
      .filter(fitRange(filterNumber, 'minPlayers', 'maxPlayers'))
      .sort(pipe(pick(activeHeader.id), nullToInfinity, compare, sortDirection(isAscending))
      ));
    window.scrollTo(0, 0);
  }, [isAscending, activeHeader, boardgamesList, filterNumber]);

  return (
    <List>
      <Content>
        <BoardgameHeaderWrap>
          <BoardgameHeaderRow>
            {headers.map((header) => (
              <BoardgameHeader
                key={header.id}
                header={header}
                sortArrow={(activeHeader.name === header.name) && <Arrow isAscending={isAscending} />}
                activeHeader={activeHeader}
                setActiveHeader={setActiveHeader}
                setAscending={setIsAscending}
                isAscending={isAscending} />
            ))}
          </BoardgameHeaderRow>
        </BoardgameHeaderWrap>
        <BoardgameHeaderRows>
          {sortedBoardgamesList.map(({ name, maxPlayers, minPlayers, searchName }) => {
            return <BoardgameRow key={name} name={name} min={minPlayers} max={maxPlayers} />
          })}
        </BoardgameHeaderRows>
        <InputArea>
          <label htmlFor="filter">Кол-во игроков</label>
          <input type="text" id="filter" value={filterNumber} onInput={(e) => { setFilterNumber(e.target.value) }} />
        </InputArea>
      </Content>
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  flex: 1;
`;

const BoardgameHeaderWrap = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    background: white;
    box-shadow: 0 0px 6px 0px #c7c7c7;
`;

const BoardgameHeaderRows = styled.div`
  padding-bottom: 15px;
`;

const InputArea = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  margin-top: auto;
  padding: 15px 20px;
  background: white;
  box-shadow: 0 -10px 10px 0px #ffffff;
  label {
    margin-right: 15px;
  }
  input {
    width: 100px;
  }
`;

export default App;
