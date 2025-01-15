import React, { useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NavBar from "./NavBar";

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("NavBar Component", () => {
  let store: any;

  const initialState = {
    filters: {
      priority: "",
    },
  };
  store = mockStore(initialState);

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  const setup = () =>
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );

  it("renders without crashing", () => {
    setup();
    expect(screen.getByText("FTS - Lukas Silveira")).toBeInTheDocument();
  });
});
