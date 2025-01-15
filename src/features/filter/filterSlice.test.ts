import filterReducer, { setFilter, resetFilters } from "./filterSlice";

describe("filterSlice", () => {
  const initialState = {
    status: "",
    priority: "",
  };

  it("should handle initial state", () => {
    expect(filterReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle setFilter", () => {
    const state = filterReducer(
      initialState,
      setFilter({ name: "status", value: "completed" })
    );
    expect(state.status).toBe("completed");
  });

  it("should handle resetting filters", () => {
    const stateWithFilters = filterReducer(
      initialState,
      setFilter({ name: "priority", value: "high" })
    );
    expect(stateWithFilters.priority).toBe("high");

    const resetState = filterReducer(stateWithFilters, resetFilters());
    expect(resetState).toEqual(initialState);
  });

  it("should handle unknown actions", () => {
    expect(filterReducer(initialState, { type: "unknown" })).toEqual(
      initialState
    );
  });
});
