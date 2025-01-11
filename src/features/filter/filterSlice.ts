import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  status: string;
  priority: string;
}

const initialState: FilterState = {
  status: "",
  priority: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      (state as any)[name] = value;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilter, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
