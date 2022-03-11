import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BuildingState {
  floors: number;
  elevators: number;
  error: null | Error;
  loading: boolean;
}

const initialState: BuildingState = {
  floors: 0,
  elevators: 0,
  error: null,
  loading: false,
};

export const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    fetchBuilding: (state) => {
      state.loading = true;
    },
    fetchBuildingFailed: (state) => ({
      ...state,
      loading: false,
      error: new Error("Building info fetch failed"),
    }),
    fetchBuildingSucceeded: (_, action: PayloadAction<API.Building>) => ({
      error: null,
      loading: false,
      elevators: action.payload.elevators,
      floors: action.payload.floors,
    }),
  },
});

export const { fetchBuilding, fetchBuildingFailed, fetchBuildingSucceeded } =
  buildingSlice.actions;

export default buildingSlice.reducer;
