import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskModal from "./TaskModal";

describe("TaskModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  const setup = (open = true) => {
    render(<TaskModal open={open} onClose={mockOnClose} onSave={mockOnSave} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when open", () => {
    setup();
    expect(screen.getByText("Nova Tarefa")).toBeInTheDocument();
    expect(screen.getByLabelText("Título")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição")).toBeInTheDocument();
    expect(screen.getByLabelText("Prioridade")).toBeInTheDocument();
    expect(screen.getByLabelText("Prazo")).toBeInTheDocument();
    expect(screen.getByLabelText("Responsável")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Criar Tarefa" })).toBeDisabled();
  });

  it("does not render when open is false", () => {
    setup(false);
    expect(screen.queryByText("Nova Tarefa")).not.toBeInTheDocument();
  });

  it("updates input fields and validates the form", () => {
    setup();

    const titleInput = screen.getByLabelText("Título");
    const descriptionInput = screen.getByLabelText("Descrição");
    const priorityInput = screen.getByLabelText("Prioridade");
    const deadlineInput = screen.getByLabelText("Prazo");
    const responsibleInput = screen.getByLabelText("Responsável");
    const createButton = screen.getByRole("button", { name: "Criar Tarefa" });

    fireEvent.change(titleInput, { target: { value: "New Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Task Description" },
    });
    fireEvent.change(deadlineInput, { target: { value: "2025-01-20" } });
    fireEvent.change(responsibleInput, { target: { value: "John Doe" } });

    fireEvent.mouseDown(priorityInput);
    const highOption = screen.getByText("Alta");
    fireEvent.click(highOption);

    expect(titleInput).toHaveValue("New Task");
    expect(descriptionInput).toHaveValue("Task Description");
    expect(priorityInput).toHaveTextContent("Alta");
    expect(deadlineInput).toHaveValue("2025-01-20");
    expect(responsibleInput).toHaveValue("John Doe");

    expect(createButton).not.toBeDisabled();
  });

  it("calls onSave with correct data when form is submitted", () => {
    const onSaveMock = jest.fn();
    const onCloseMock = jest.fn();

    render(<TaskModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Descrição"), {
      target: { value: "Task Description" },
    });

    const priorityInput = screen.getByLabelText("Prioridade");
    fireEvent.mouseDown(priorityInput);
    const altaOption = screen.getByText("Alta");
    fireEvent.click(altaOption);

    fireEvent.change(screen.getByLabelText("Prazo"), {
      target: { value: "2025-01-20" },
    });
    fireEvent.change(screen.getByLabelText("Responsável"), {
      target: { value: "John Doe" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Criar Tarefa" }));

    expect(onSaveMock).toHaveBeenCalledWith({
      title: "New Task",
      description: "Task Description",
      priority: "Alta",
      deadline: "2025-01-20",
      responsible: "John Doe",
      createdAt: expect.any(Number),
      status: "Pendente",
    });

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onClose when modal is closed", () => {
    const setup = () => {
      render(
        <TaskModal open={true} onClose={mockOnClose} onSave={jest.fn()} />
      );
      return screen;
    };
    const { getByRole } = setup();

    const modalElement = getByRole("presentation");
    expect(modalElement).toBeInTheDocument();

    fireEvent.keyDown(modalElement, { key: "Escape", code: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
