import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../models/task";

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      return action.payload; // Substitui o estado pelas novas tarefas
    },
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const nextId = state.length > 0 ? state[state.length - 1].id + 1 : 1;
      state.push({ id: nextId, ...action.payload });
    },

    updateTask(state, action: PayloadAction<Task>) {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // Atualiza a tarefa existente
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      return state.filter((task) => task.id.toString() !== action.payload); // Remove a tarefa pelo ID
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
