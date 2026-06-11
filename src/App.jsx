import { useState } from "react";
import "./App.css";

function Square({ value, onClick, isWinner }) {
return (
<button
className={`square ${isWinner ? "winner" : ""}`}
onClick={onClick}
>
{value} </button>
);
}

function Board({ squares, xIsNext, onPlay }) {
const winnerData = calculateWinner(squares);

function handleClick(i) {
if (squares[i] || winnerData) return;


const nextSquares = squares.slice();
nextSquares[i] = xIsNext ? "X" : "O";

onPlay(nextSquares);


}

let status;

if (winnerData) {
status = `🏆 Winner: ${winnerData.winner}`;
} else if (!squares.includes(null)) {
status = "🤝 Draw!";
} else {
status = `🎮 Turn: ${xIsNext ? "X" : "O"}`;
}

return (
<> <h2 className="status">{status}</h2>

  <div className="board">
    {squares.map((square, i) => (
      <Square
        key={i}
        value={square}
        onClick={() => handleClick(i)}
        isWinner={
          winnerData &&
          winnerData.line.includes(i)
        }
      />
    ))}
  </div>
</>


);
}

export default function App() {
const [history, setHistory] = useState([
Array(9).fill(null),
]);

const [currentMove, setCurrentMove] =
useState(0);

const xIsNext = currentMove % 2 === 0;

const currentSquares =
history[currentMove];

function handlePlay(nextSquares) {
const nextHistory = [
...history.slice(
0,
currentMove + 1
),
nextSquares,
];


setHistory(nextHistory);
setCurrentMove(
  nextHistory.length - 1
);


}

function restartGame() {
setHistory([Array(9).fill(null)]);
setCurrentMove(0);
}

return ( <div className="container"> <h1>⚡ CYBER TIC TAC TOE ⚡</h1>


  <Board
    squares={currentSquares}
    xIsNext={xIsNext}
    onPlay={handlePlay}
  />

  <button
    className="restart"
    onClick={restartGame}
  >
    Restart Game
  </button>
</div>


);
}

function calculateWinner(squares) {
const lines = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],
];

for (let line of lines) {
const [a,b,c] = line;


if (
  squares[a] &&
  squares[a] === squares[b] &&
  squares[a] === squares[c]
) {
  return {
    winner: squares[a],
    line,
  };
}


}

return null;
}
