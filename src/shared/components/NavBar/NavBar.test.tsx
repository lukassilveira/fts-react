import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NavBar from "./NavBar";

const mockStore = configureStore([]);

describe("NavBar Component", () => {
  it("renders without crashing", () => {
    // Estado inicial mockado
    const initialState = {
      tasks: [
        {
          id: 1,
          title: "Task 1",
          description: "Description 1",
          status: "Pendente",
          priority: "Alta",
          createdAt: Date.now(),
          deadline: Date.now(),
          responsible: "User A",
        },
        {
          id: 2,
          title: "Task 2",
          description: "Description 2",
          status: "Concluída",
          priority: "Média",
          createdAt: Date.now(),
          deadline: Date.now(),
          responsible: "User B",
        },
      ],
    };

    const store = mockStore(initialState);

    // Renderizando o NavBar com o Provider do Redux
    const { getByText } = render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );

    // Verifica se o título do AppBar é renderizado
    expect(getByText("FTS - Lukas Silveira")).toBeInTheDocument();
  });
});
