import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sortByState {
  sortBy: string;
}

const initialState: sortByState = {
  sortBy: "recent",
};

const sortBySlice = createSlice({
  name: "sortBy",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortBySlice.actions;
export default sortBySlice.reducer;
