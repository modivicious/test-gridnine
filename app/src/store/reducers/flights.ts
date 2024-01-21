import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Flight } from '../../types';

export const FLIGHTS = 'flights';

interface FlightsState {
  [FLIGHTS]: Flight[];
}

const initialState = {
  [FLIGHTS]: [],
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState: initialState,
  reducers: {
    updateFlights(state: FlightsState, action: PayloadAction<Flight[]>) {
      state[FLIGHTS] = action.payload;
    },
  },
});

export const { updateFlights } = flightsSlice.actions;

export default flightsSlice.reducer;
