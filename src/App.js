import "./App.css";
import Board from "./Components/board";

function App() {
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <Board />
      <footer>
        This game was developed by{" "}
        <a
          href="https://github.com/AdrianMReds"
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          @AdrianMReds
        </a>
      </footer>
    </div>
  );
}

export default App;
