import React from "react";
import EditTaskModal from "./EditTaskModal";
import { Task } from "../../../../models/task";
import { render, screen, fireEvent } from "@testing-library/react";

const mockTask: Task = {
  id: 1,
  title: "Test Task",
  description: "This is a test task",
  priority: "Baixa",
  deadline: new Date("2002-04-23T18:25:43.511Z").getTime(),
  responsible: "John Doe",
  status: "Pendente",
  createdAt: Date.now(),
};

const mockHandleEdit = jest.fn();
const mockHandleClose = jest.fn();
const mockHandleInputChange = jest.fn();

describe("EditTaskModal", () => {
  it("renders the modal with the task fields", () => {
    render(
      <EditTaskModal
        open={true}
        onClose={mockHandleClose}
        taskData={mockTask}
        handleInputChange={mockHandleInputChange}
        handleEdit={mockHandleEdit}
      />
    );

    expect(screen.getByText("Editar Tarefa")).toBeInTheDocument();
    expect(screen.getByLabelText("Título")).toHaveValue(mockTask.title);
    expect(screen.getByLabelText("Descrição")).toHaveValue(
      mockTask.description
    );
    expect(screen.getByDisplayValue("Baixa")).toBeInTheDocument();
    expect(screen.getByLabelText("Responsável")).toHaveValue(
      mockTask.responsible
    );
    expect(screen.getByLabelText("Prazo")).toHaveValue(
      new Date(mockTask.deadline).toISOString().split("T")[0]
    );
  });
});
