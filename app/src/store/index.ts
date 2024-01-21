import { configureStore, combineReducers } from "@reduxjs/toolkit";

import filtersSlice from "./reducers/filters";
import flightsSlice from "./reducers/flights";

const rootReducer = combineReducers({
  filtersSlice,
  flightsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
