import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("queryHistory");
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (queries) => {
  localStorage.setItem("queryHistory", JSON.stringify(queries));
};

const querySlice = createSlice({
  name: "query",
  initialState: {
    queries: loadFromLocalStorage(),
    result: null,
    loading: false,
    error: null,
  },
  reducers: {
    submitQuery: (state) => {
      state.loading = true;
      state.error = null;
    },
    querySuccess: (state, action) => {
      state.loading = false;
      state.result = action.payload;
      state.queries.push(action.payload);
      saveToLocalStorage(state.queries);
    },
    queryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { submitQuery, querySuccess, queryFailure } = querySlice.actions;
export default querySlice.reducer;
