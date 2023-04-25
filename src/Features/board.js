import { createSlice } from "@reduxjs/toolkit";
import generateBoard from "../Components/helper";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    value: {
      board: generateBoard("facil"),
      difficulty: "facil",
      competition: "champions_league",
    },
  },
  reducers: {
    updateBoard: (state, action) => {
      state.value.board = action.payload;
    },
    updateDifficulty: (state, action) => {
      state.value.difficulty = action.payload;
    },
    updateCompetition: (state, action) => {
      state.value.competition = action.payload;
    },
  },
});

export const { updateBoard, updateDifficulty, updateCompetition } =
  boardSlice.actions;

export default boardSlice.reducer;
