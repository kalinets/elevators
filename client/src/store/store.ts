import { configureStore } from "@reduxjs/toolkit";
import buildingSlice from "./buildingSlice";
import elevatorsSlice from "./elevatorsSlice";

export const store = configureStore({
  reducer: {
    building: buildingSlice,
    elevators: elevatorsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
