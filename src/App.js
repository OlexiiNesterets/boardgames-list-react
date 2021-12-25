import boardgamesList from './boardgames-list.json';

function App() {
  return (
    <div>
        {boardgamesList.map((boardgame) => {
          return <div key={boardgame.name}>{boardgame.name}</div>
        })}
    </div>
  );
}

export default App;
