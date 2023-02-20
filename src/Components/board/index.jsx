import React, { useState, useEffect, useRef } from "react";
import ButtonGrid from "../button-grid";
import { FaFlag } from "react-icons/fa";
import { useSelector } from "react-redux";

const addNumbers = (b) => {
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < b[i].length; j++) {
      if (b[i][j] === 9) {
        //Upper row
        if (i > 0) {
          if (j > 0) {
            b[i - 1][j - 1] += b[i - 1][j - 1] === 9 ? 0 : 1;
          }
          b[i - 1][j] += b[i - 1][j] === 9 ? 0 : 1;
          if (j < b[i].length - 1) {
            b[i - 1][j + 1] += b[i - 1][j + 1] === 9 ? 0 : 1;
          }
        }
        //Middle row (sides)
        if (j > 0) {
          b[i][j - 1] += b[i][j - 1] === 9 ? 0 : 1;
        }
        if (j < b[i].length - 1) {
          b[i][j + 1] += b[i][j + 1] === 9 ? 0 : 1;
        }
        //Lower rows
        if (i < b.length - 1) {
          if (j > 0) {
            b[i + 1][j - 1] += b[i + 1][j - 1] === 9 ? 0 : 1;
          }
          b[i + 1][j] += b[i + 1][j] === 9 ? 0 : 1;
          if (j < b[i].length - 1) {
            b[i + 1][j + 1] += b[i + 1][j + 1] === 9 ? 0 : 1;
          }
        }
      }
    }
  }
  return b;
};

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
  }
  //   console.log(boardArray);
  for (let x = 0; x < boardArray.length; x++) {
    board.push([]);
    for (let y = 0; y < boardArray.length; y++) {
      board[x].push(mines.includes(counter) ? 9 : 0);
      counter += 1;
    }
  }
  board = addNumbers(board);
  return board;
};

const Board = () => {
  const board = useSelector((state) => state.board.value);
  // const [board, setBoard] = useState(generateBoard());
  const [reRender, setReRender] = useState(true);
  const [flags, setFlags] = useState(10);

  const modifyFlags = (type) => {
    setFlags((prevFlags) =>
      type === "+" ? prevFlags + 1 : type === "-" ? prevFlags - 1 : prevFlags
    );
  };

  const rerender = () => {
    setReRender(reRender ? false : true);
  };

  useEffect(() => {
    // console.log(`board: ${JSON.stringify(board)}`);
    console.log(`rerender: ${reRender}`);
    console.log("render nuevo");
  }, []);

  useEffect(() => {
    console.log(`Flags changed: ${flags}`);
  }, [flags]);

  useEffect(() => {
    console.log(`ReRender: ${reRender}`);
  }, [reRender]);

  useEffect(() => {
    console.log(`Cambió board`);
  }, [board]);

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
      <h2>
        <FaFlag /> Flags: {flags}
      </h2>
      {/* <div>{board}</div> */}
      {/* <button
        onClick={() => {
          setBoard(generateBoard());
        }}
      >
        Restart
      </button> */}
      <ButtonGrid board={board} modFlags={modifyFlags} setRender={rerender} />
    </div>
  );
};

export default Board;
