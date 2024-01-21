import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ASCENDING,
  DESCENDING,
  DURATION,
  START_MAX_PRICE,
  START_MIN_PRICE,
} from '../../constants';

export const SORT = 'sort';
export const FILTER_BY_TRANSFER = 'chooseByTransfer';
export const FILTER_BY_PRICE = 'filterByPriceRange';
export const FILTER_BY_CARRIER = 'chooseByCarrier';

export const ONE_TRANSFER = 'oneTransfer';
export const DIRECT = 'direct';
export const MIN_PRICE = 'minPrice';
export const MAX_PRICE = 'maxPrice';

export interface ISort {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
}

export interface ITransfer {
  id: string;
  name: string;
  value: number;
  label: string;
  checked: boolean;
}

export interface IPrice {
  id: string;
  name: string;
  label: string;
  value: number;
}

export interface ICarrier {
  id: string;
  name: string;
  value: string;
  minPrice: number;
  checked: boolean;
}

export interface FiltersState {
  [SORT]: {
    [name: string]: ISort;
  };
  [FILTER_BY_TRANSFER]: {
    [name: string]: ITransfer;
  };
  [FILTER_BY_PRICE]: {
    [name: string]: IPrice;
  };
  [FILTER_BY_CARRIER]: {
    [name: string]: ICarrier;
  };
}

const initialState: FiltersState = {
  [SORT]: {
    [ASCENDING]: {
      id: ASCENDING,
      name: SORT,
      value: ASCENDING,
      label: 'по возрастанию цены',
      checked: true,
    },
    [DESCENDING]: {
      id: DESCENDING,
      name: SORT,
      value: DESCENDING,
      label: 'по убыванию цены',
      checked: false,
    },
    [DURATION]: {
      id: DURATION,
      name: SORT,
      value: DURATION,
      label: 'по времени в пути',
      checked: false,
    },
  },
  [FILTER_BY_TRANSFER]: {
    [DIRECT]: {
      id: DIRECT,
      name: DIRECT,
      value: 0,
      label: 'без пересадок',
      checked: true,
    },
    [ONE_TRANSFER]: {
      id: ONE_TRANSFER,
      name: ONE_TRANSFER,
      value: 1,
      label: '1 пересадка',
      checked: true,
    },
  },
  [FILTER_BY_PRICE]: {
    [MIN_PRICE]: {
      id: MIN_PRICE,
      name: MIN_PRICE,
      label: 'От',
      value: START_MIN_PRICE,
    },
    [MAX_PRICE]: {
      id: MIN_PRICE,
      name: MAX_PRICE,
      label: 'До',
      value: START_MAX_PRICE,
    },
  },
  [FILTER_BY_CARRIER]: {},
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    updateSort(state: FiltersState, action: PayloadAction<string>) {
      const currentActiveSort =
        Object.values(state[SORT]).find((sort) => sort.checked)?.value || '';

      state[SORT][currentActiveSort].checked = false;
      state[SORT][action.payload].checked = true;
    },
    updateTransfer(state: FiltersState, action: PayloadAction<string>) {
      state[FILTER_BY_TRANSFER][action.payload].checked =
        !state[FILTER_BY_TRANSFER][action.payload].checked;
    },
    updatePriceRange(
      state: FiltersState,
      action: PayloadAction<{ name: string; value: number }>
    ) {
      state[FILTER_BY_PRICE][action.payload.name].value = action.payload.value;
    },
    setFilterByCarrier(state: FiltersState, action: PayloadAction<{[name: string]: ICarrier}>) {
      state[FILTER_BY_CARRIER] = action.payload;
    },
    updateFilterByCarrier(state: FiltersState, action: PayloadAction<string>) {
      state[FILTER_BY_CARRIER][action.payload].checked =
        !state[FILTER_BY_CARRIER][action.payload].checked;
    },
  },
});

export const {
  updateSort,
  updateTransfer,
  updatePriceRange,
  setFilterByCarrier,
  updateFilterByCarrier,
} = filtersSlice.actions;

export default filtersSlice.reducer;
