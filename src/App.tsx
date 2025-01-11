import "./App.css";
import React, { useEffect } from "react";
import TaskList from "./shared/components/TaskList/TaskList.tsx";
import NavBar from "./shared/components/NavBar/NavBar.tsx";
import { useDispatch } from "react-redux";
import { setTasks } from "./features/task/taskSlice.ts";
import { mockTasks } from "./mock/tasks.ts";

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
