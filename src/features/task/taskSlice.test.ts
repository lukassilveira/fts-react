import taskSlice, {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./taskSlice";
import { Task } from "../../models/task";

describe("taskSlice", () => {
  const initialState: Task[] = [];

  const mockTask1 = {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    status: "Pendente",
    priority: "Baixa",
    createdAt: 0,
    deadline: 0,
    responsible: "John Doe 1",
  };

  const mockTask2 = {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    status: "Concluída",
    priority: "Alta",
    createdAt: 0,
    deadline: 0,
    responsible: "John Doe 2",
  };

  it("should handle initial state", () => {
    expect(taskSlice(initialState, { type: "" })).toEqual(initialState);
  });

  it("should handle setTasks", () => {
    const tasks: Task[] = [mockTask1, mockTask2];
    const newState = taskSlice(initialState, setTasks(tasks));
    expect(newState).toEqual(tasks);
  });

  it("should handle addTask", () => {
    const addMockTask = {
      title: "Task 2",
      description: "Description 2",
      status: "Concluída",
      priority: "Alta",
      createdAt: 0,
      deadline: 0,
      responsible: "John Doe 2",
    };
    const initialState: Task[] = [mockTask1];
    const newState = taskSlice(initialState, addTask(addMockTask));

    expect(newState.length).toBe(2);
    expect(newState[1].id).toBe(2);
    expect(newState[1]).toEqual({ id: 2, ...addMockTask });
  });

  it("should handle updateTask", () => {
    const initialState: Task[] = [mockTask1];
    const updatedTask: Task = {
      id: 1,
      title: "Updated Task 1",
      description: "Updated Description 1",
      status: "Pendente",
      priority: "Baixa",
      createdAt: 0,
      deadline: 0,
      responsible: "John Doe 1",
    };
    const newState = taskSlice(initialState, updateTask(updatedTask));

    expect(newState[0]).toEqual(updatedTask);
  });

  it("should handle deleteTask", () => {
    const initialState: Task[] = [mockTask1, mockTask2];
    const newState = taskSlice(initialState, deleteTask("1"));

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe(2);
  });

  it("should handle unknown actions", () => {
    const initialState: Task[] = [mockTask1];
    const newState = taskSlice(initialState, { type: "unknown" });
    expect(newState).toEqual(initialState);
  });
});
