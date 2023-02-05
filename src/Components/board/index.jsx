import React, { useState } from "react";
import ButtonGrid from "../button-grid";

const generateBoard = () => {
  let boardArray = new Array(10).fill(new Array(10).fill(0));
  const randomArray = Array.from(Array(100).keys());

  let counter = 0;
  let board = [];
  let mines = [];
  for (let i = 0; i < 10; i++) {
    let rndm = Math.floor(Math.random() * randomArray.length);

    mines.push(randomArray[rndm]);
    randomArray.splice(rndm, 1);
    console.log(`randomarray length ${randomArray.length}`);
  }
  console.log(boardArray);
  console.log(`mines ${mines}`);
  for (let x = 0; x < boardArray.length; x++) {
    board.push([]);
    for (let y = 0; y < boardArray.length; y++) {
      board[x].push(mines.includes(counter) ? 9 : 0);
      counter += 1;
    }
  }
  console.log(`board ${board}`);
  return board;
};

const Board = () => {
  const [board, setBoard] = useState(generateBoard());

  const countMines = () => {
    let mineCounter = 0;
    board.map((row) => {
      let num = row.filter((x) => x === 9).length;
      mineCounter += num;
    });
    return mineCounter;
  };

  return (
    <div style={{ textAlign: "-webkit-center" }}>
      <div>{board}</div>
      <button
        onClick={() => {
          setBoard(generateBoard());
        }}
      >
        Restart
      </button>
      <div>{countMines()}</div>
      <ButtonGrid board={board} />
    </div>
  );
};

export default Board;
