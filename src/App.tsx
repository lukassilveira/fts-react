import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mockTasks } from "./mock/tasks.ts";
import { setTasks } from "./features/task/taskSlice.ts";
import NavBar from "./shared/components/NavBar/NavBar.tsx";
import TaskList from "./shared/components/TaskList/TaskList.tsx";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTasks(mockTasks));
  }, [dispatch]);
  return (
    <div className="App">
      <NavBar />
      <TaskList />
    </div>
  );
};

export default App;
