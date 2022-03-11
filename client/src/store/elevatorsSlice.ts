import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
  error: null | Error;
  loading: boolean;
  data: null | API.Elevator[];
}

const initialState: state = {
  error: null,
  loading: false,
  data: null,
};

export const elevatorsSlice = createSlice({
  name: "elevators",
  initialState,
  reducers: {
    fetchElevators: (state) => {
      state.loading = true;
    },
    fetchElevatorsFailed: (state) => ({
      ...state,
      loading: false,
      error: new Error("Elevators fetch failed"),
    }),
    fetchElevatorsSucceeded: (
      state,
      action: PayloadAction<API.Elevator[]>
    ) => ({
      ...state,
      loading: false,
      data: action.payload,
    }),
  },
});

export const { fetchElevators, fetchElevatorsFailed, fetchElevatorsSucceeded } =
  elevatorsSlice.actions;

export default elevatorsSlice.reducer;
