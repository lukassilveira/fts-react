import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import TaskCard from "../TaskCard/TaskCard.tsx";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const filters = useSelector((state: RootState) => state.filters);
  const sortBy = useSelector((state: RootState) => state.sortBy.sortBy);

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.status === "" || task.status === filters.status) &&
      (filters.priority === "" || task.priority === filters.priority)
    );
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "recent") {
      return b.createdAt - a.createdAt;
    } else if (sortBy === "oldest") {
      return a.createdAt - b.createdAt;
    } else if (sortBy === "nearDeadline") {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    } else if (sortBy === "farDeadline") {
      return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
    }
    return 0;
  });

  return (
    <div
      className="task-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "35px",
        justifyContent: "center",
        margin: "35px 0",
      }}
    >
      {sortedTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
