import sortByReducer, { setSortBy } from "./sortBySlice";

describe("sortBySlice", () => {
  const initialState = {
    sortBy: "recent",
  };

  it("should handle initial state", () => {
    expect(sortByReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle setSortBy", () => {
    const state = sortByReducer(initialState, setSortBy("name"));
    expect(state.sortBy).toBe("name");
  });

  it("should handle resetting to default", () => {
    const newState = sortByReducer(initialState, setSortBy("recent"));
    expect(newState.sortBy).toBe("recent");

    const resetState = sortByReducer(newState, { type: "" });
    expect(resetState).toEqual(initialState);
  });

  it("should handle unknown actions", () => {
    expect(sortByReducer(initialState, { type: "unknown" })).toEqual(
      initialState
    );
  });
});
