import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFlight } from '../../types';

export const FLIGHTS = 'flights';

interface IFlightsState {
  [FLIGHTS]: IFlight[];
}

const initialState = {
  [FLIGHTS]: [],
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState: initialState,
  reducers: {
    updateFlights(state: IFlightsState, action: PayloadAction<IFlight[]>) {
      state[FLIGHTS] = action.payload;
    },
  },
});

export const { updateFlights } = flightsSlice.actions;

export default flightsSlice.reducer;
