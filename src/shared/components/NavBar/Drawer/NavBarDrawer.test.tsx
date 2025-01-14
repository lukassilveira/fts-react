import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBarDrawer from "./NavBarDrawer";

const mockHandleFilterChange = jest.fn();
const mockHandleSortChange = jest.fn();

jest.mock("../../../services/taskService.ts", () => ({
  useTaskService: () => ({
    filters: { priority: "", status: "" },
    sortBy: { sortBy: "" },
    handleFilterChange: mockHandleFilterChange,
    handleSortChange: mockHandleSortChange,
  }),
}));

describe("NavBarDrawer Component", () => {
  const mockToggleDrawer = jest.fn();
  const mockHandleModalOpen = jest.fn();

  const setup = (drawerOpen = true) => {
    return render(
      <NavBarDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={mockToggleDrawer}
        handleModalOpen={mockHandleModalOpen}
      />
    );
  };

  it("renders the drawer when open", () => {
    setup();

    const drawers = screen.getAllByRole("presentation");
    const drawer = drawers.find((el) =>
      el.classList.contains("MuiDrawer-root")
    );
    expect(drawer).toBeInTheDocument();
  });

  it("does not render the drawer when closed", () => {
    setup(false);

    const drawer = screen.queryByRole("presentation");
    expect(drawer).not.toBeInTheDocument();
  });

  it("displays filter options", () => {
    setup();

    expect(screen.getByLabelText("Prioridade")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });

  it("calls handleFilterChange on filter selection", () => {
    setup();

    const combobox = screen.getByRole("combobox", { name: "Prioridade" });
    fireEvent.mouseDown(combobox);

    const highOption = screen.getByRole("option", { name: "Alta" });
    fireEvent.click(highOption);

    expect(mockHandleFilterChange).toHaveBeenCalledWith("priority", "Alta");
  });

  it("calls handleSortChange on sort selection", () => {
    setup();

    const sortByField = screen.getByLabelText("Data");
    fireEvent.mouseDown(sortByField);

    const option = screen.getByRole("option", { name: "Criação mais recente" });
    fireEvent.click(option);

    expect(mockHandleSortChange).toHaveBeenCalledWith("recent");
  });

  it("calls toggleDrawer on clicking inside the drawer", () => {
    setup();

    const drawer = screen.getByTestId("nav-bar-drawer");
    fireEvent.click(drawer);

    expect(mockToggleDrawer).toHaveBeenCalledWith(false);
  });

  it("calls handleModalOpen on clicking 'Adicionar Tarefa'", () => {
    setup();

    const addTaskButton = screen.getByText("Adicionar Tarefa");
    fireEvent.click(addTaskButton);

    expect(mockHandleModalOpen).toHaveBeenCalled();
  });

  it("renders the 'Gráficos' button", () => {
    setup();

    const graphsButton = screen.getByText("Gráficos");
    expect(graphsButton).toBeInTheDocument();
  });
});
