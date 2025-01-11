import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/task/taskSlice.ts";
import filterReducer from "./features/filter/filterSlice.ts";
import sortByReducer from "./features/sortBy/sortBySlice.ts";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filters: filterReducer,
    sortBy: sortByReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
