import { createSlice } from "@reduxjs/toolkit";
import generateBoard from "../Components/helper";

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
