import { createSlice } from "@reduxjs/toolkit";

const addNumbers = (b) => {
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < b[i].length; j++) {
      if (b[i][j].value === 9) {
        //Upper row
        if (i > 0) {
          if (j > 0) {
            b[i - 1][j - 1].value += b[i - 1][j - 1].value === 9 ? 0 : 1;
          }
          b[i - 1][j].value += b[i - 1][j].value === 9 ? 0 : 1;
          if (j < b[i].length - 1) {
            b[i - 1][j + 1].value += b[i - 1][j + 1].value === 9 ? 0 : 1;
          }
        }
        //Middle row (sides)
        if (j > 0) {
          b[i][j - 1].value += b[i][j - 1].value === 9 ? 0 : 1;
        }
        if (j < b[i].length - 1) {
          b[i][j + 1].value += b[i][j + 1].value === 9 ? 0 : 1;
        }
        //Lower rows
        if (i < b.length - 1) {
          if (j > 0) {
            b[i + 1][j - 1].value += b[i + 1][j - 1].value === 9 ? 0 : 1;
          }
          b[i + 1][j].value += b[i + 1][j].value === 9 ? 0 : 1;
          if (j < b[i].length - 1) {
            b[i + 1][j + 1].value += b[i + 1][j + 1].value === 9 ? 0 : 1;
          }
        }
      }
    }
  }
  return b;
};

const generateBoard = () => {
  let boardArray = new Array(10).fill(new Array(10).fill());

  const randomArray = Array.from(Array(100).keys());

  let counter = 0;
  let board = [];
  let mines = [];
  //Generate mine locations
  for (let i = 0; i < 10; i++) {
    let rndm = Math.floor(Math.random() * randomArray.length);

    mines.push(randomArray[rndm]);
    randomArray.splice(rndm, 1);
  }
  //   console.log(boardArray);
  //Board generation
  for (let x = 0; x < boardArray.length; x++) {
    board.push([]);
    for (let y = 0; y < boardArray.length; y++) {
      let num = mines.includes(counter) ? 9 : 0;
      board[x].push({
        value: num,
        status: "b",
        coords: { x: x, y: y },
      });
      counter += 1;
    }
  }
  console.log(boardArray);
  board = addNumbers(board);
  return board;
};

export const boardSlice = createSlice({
  name: "board",
  initialState: { value: generateBoard() },
  reducers: {
    updateBoard: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateBoard } = boardSlice.actions;

export default boardSlice.reducer;
