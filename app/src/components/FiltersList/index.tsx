import React from 'react';

import Filter from '../Filter';
import RadioGroup from '../RadioGroup';
import CheckboxGroup from '../CheckboxGroup';
import InputNumber from '../InputNumber';
import AirlineCaption from '../AirlineCaption';

import {
  SORT,
  FILTER_BY_TRANSFER,
  updateTransfer,
  FILTER_BY_PRICE,
  updatePriceRange,
  MIN_PRICE,
  MAX_PRICE,
  FILTER_BY_CARRIER,
  updateFilterByCarrier,
} from '../../store/reducers/filters';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateSort } from '../../store/reducers/filters';
import { RootState } from '../../store';

import styles from './FiltersList.module.scss';

const FiltersList = () => {
  const dispatch = useAppDispatch();

  const sort = useAppSelector((state: RootState) => state.filtersSlice[SORT]);
  const transferFilter = useAppSelector(
    (state: RootState) => state.filtersSlice[FILTER_BY_TRANSFER]
  );
  const priceFilter = useAppSelector(
    (state: RootState) => state.filtersSlice[FILTER_BY_PRICE]
  );
  const carrierFilter = useAppSelector(
    (state: RootState) => state.filtersSlice[FILTER_BY_CARRIER]
  );

  const sortVariants = Object.values(sort);
  const transferVariants = Object.values(transferFilter);
  const carrierVariants = Object.values(carrierFilter).map((carrier) => ({
    ...carrier,
    customCaption: (
      <AirlineCaption
        airline={carrier.name}
        price={`от ${carrier.minPrice} ₽`}
      />
    ),
  }));

  const onSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSort(e.target.value));
  };

  const onTransferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTransfer(e.target.name));
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = Number(e.target.value);

    dispatch(updatePriceRange({ name, value }));
  };

  const onCarrierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    dispatch(updateFilterByCarrier(name));
  };

  return (
    <div className={styles.filters}>
      <Filter title="Сортировать">
        <RadioGroup radios={sortVariants} onChange={onSortChange} />
      </Filter>
      <Filter title="Фильтровать">
        <CheckboxGroup
          checkboxes={transferVariants}
          onChange={onTransferChange}
        />
      </Filter>
      <Filter title="Цена">
        <InputNumber
          id={priceFilter[MIN_PRICE].id}
          name={priceFilter[MIN_PRICE].name}
          label={priceFilter[MIN_PRICE].label}
          value={priceFilter[MIN_PRICE].value}
          onChange={onPriceChange}
        />
        <InputNumber
          id={priceFilter[MAX_PRICE].id}
          name={priceFilter[MAX_PRICE].name}
          label={priceFilter[MAX_PRICE].label}
          value={priceFilter[MAX_PRICE].value}
          onChange={onPriceChange}
        />
      </Filter>
      <Filter title="Авиакомпании">
        <CheckboxGroup
          checkboxes={carrierVariants}
          onChange={onCarrierChange}
        />
      </Filter>
    </div>
  );
};

export default FiltersList;
