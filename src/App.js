import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getBoardgamelist } from './api/getBoardgamelist';
import { BoardgameHeader, BoardgameHeaderRow, BoardgameRow } from './entities';
import { Arrow } from './shared';
import { MyHeader } from './shared/arrow';

function App() {

  const pipe = (...fns) => (...val) => {
    return fns.reduce((acc, current) => {
      if (Array.isArray(acc)) {
        return current(...acc);
      }
      return current(acc);
    }, val);
  };

  const pick = (prop) => (...objs) => objs.map(obj => obj[prop]);

  const nullToInfinity = (...vals) => vals.map(val => val || Infinity);

  const compare = (a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };

  const sortDirection = (direction) => (val) => val * (direction ? 1 : -1);

  const headers = [{ name: 'Имя', id: 'name' }, { name: 'min', id: 'minPlayers' }, { name: 'max', id: 'maxPlayers' }];

  const [boardgamesList, setBoardgamesList] = useState(() => getBoardgamelist().slice().sort(pipe(pick('name'), compare)));
  const [sortedBoardgamesList, setSortedBoardgamesList] = useState(boardgamesList);
  const [activeHeader, setActiveHeader] = useState(headers[0]);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    setSortedBoardgamesList(boardgamesList.slice().sort(
      pipe(pick(activeHeader.id), nullToInfinity, compare, sortDirection(isAscending))
    ));
    window.scrollTo(0, 0);
  }, [isAscending, activeHeader, boardgamesList]);

  return (
    <List>
      <Content>
        <BoardgameHeaderRow>
          {headers.map((header) => (
            <BoardgameHeader
              key={header.id}
              header={header}
              sortArrow={(activeHeader.name === header.name) && <Arrow isAscending={isAscending} />}
              activeHeader={activeHeader}
              setActiveHeader={setActiveHeader}
              setAscending={setIsAscending} />
          ))}
        </BoardgameHeaderRow>
        {sortedBoardgamesList.map(({ name, maxPlayers, minPlayers, searchName }) => {
          return <BoardgameRow key={name} name={name} min={minPlayers} max={maxPlayers} />
        })}
      </Content>
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  max-width: 1000px;
`;

export default App;
