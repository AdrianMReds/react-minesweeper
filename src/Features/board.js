import { createSlice } from "@reduxjs/toolkit";
import generateBoard from "../Components/helper";

export const boardSlice = createSlice({
  name: "board",
  initialState: { value: { board: generateBoard(), difficulty: "facil" } },
  reducers: {
    updateBoard: (state, action) => {
      state.value.board = action.payload;
    },
    updateDifficulty: (state, action) => {
      state.value.difficulty = action.payload;
    },
  },
});

export const { updateBoard, updateDifficulty } = boardSlice.actions;

export default boardSlice.reducer;
