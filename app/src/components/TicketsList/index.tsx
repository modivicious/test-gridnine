import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { FLIGHTS, updateFlights } from '../../store/reducers/flights';
import { RootState } from '../../store';

import Ticket from '../Ticket';
import { IFlight } from '../../types';
import { TICKETS_NUMBER_TO_SHOW } from '../../constants';

import {
  SORT,
  FILTER_BY_TRANSFER,
  FILTER_BY_PRICE,
  MIN_PRICE,
  MAX_PRICE,
  setFilterByCarrier,
  FILTER_BY_CARRIER,
} from '../../store/reducers/filters';

import { getSortFunctionByName } from '../../utils/functions';
import { getUniqueCarriers, parseFlights } from '../../utils/parseFlights';

import styles from './TicketsList.module.scss';

const TicketsList = () => {
  const dispatch = useAppDispatch();

  const flights: IFlight[] = useAppSelector(
    (state: RootState) => state.flightsSlice[FLIGHTS]
  );
  const sort = useAppSelector((state: RootState) => state.filtersSlice[SORT]);
  const transfers = useAppSelector(
    (state: RootState) => state.filtersSlice[FILTER_BY_TRANSFER]
  );
  const priceRange = useAppSelector(
    (state: RootState) => state.filtersSlice[FILTER_BY_PRICE]
  );
  const carriers = useAppSelector(
    (state: RootState) => state.filtersSlice[FILTER_BY_CARRIER]
  );

  const [filteredFlights, setFilteredFlights] = useState<IFlight[]>(flights);
  const [numberToShow, setNumberToShow] = useState(TICKETS_NUMBER_TO_SHOW);

  const setCarriersData = (parsedFlights) => {
    const uniqueCarriers = getUniqueCarriers(parsedFlights);

    dispatch(setFilterByCarrier(uniqueCarriers));
  };

  const fetchFlights = () => {
    fetch('data/flights.json')
      .then((response) => response.json())
      .then((json) => {
        const parsedFlights = parseFlights(json);

        dispatch(updateFlights(parsedFlights));
        setCarriersData(parsedFlights);
      });
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  useEffect(() => {
    const activeSort =
      Object.values(sort).find((sortType) => sortType.checked)?.value ||
      Object.values(sort)[0].value;

    const activeTransfers = Object.values(transfers)
      .filter((item) => item.checked)
      .map((item) => item.value);

    let filteredFlights: IFlight[] = [...flights].sort(
      getSortFunctionByName(activeSort)
    );

    filteredFlights = filteredFlights.filter((flight) =>
      activeTransfers.includes(flight.departInfo.transfersCount)
    );

    filteredFlights = filteredFlights.filter(
      (flight) =>
        flight.price > priceRange[MIN_PRICE].value &&
        flight.price < priceRange[MAX_PRICE].value
    );

    const activeCarriers = Object.values(carriers)
      .filter((carrier) => carrier.checked)
      .map((carrier) => carrier.name);

    filteredFlights = filteredFlights.filter((flight) =>
      activeCarriers.includes(flight.departInfo.departure.airline)
    );

    setFilteredFlights(filteredFlights);
  }, [flights, sort, transfers, priceRange, carriers]);

  const onShowMoreClick = () => {
    setNumberToShow((prev) => prev + TICKETS_NUMBER_TO_SHOW);
  };

  return (
    <div className={styles.ticketsWrapper}>
      {filteredFlights.length ? (
        <>
          <ul className={styles.tickets}>
            {filteredFlights
              .slice(0, numberToShow)
              .map((flight: IFlight, index) => (
                <li className={styles.tickets__item} key={index}>
                  <Ticket flight={flight} />
                </li>
              ))}
          </ul>

          {numberToShow < filteredFlights.length && (
            <button
              className={styles.showMoreButton}
              onClick={onShowMoreClick}
              type="button"
            >
              Показать еще
            </button>
          )}
        </>
      ) : (
        <div className={styles.notFound}>
          К сожалению, по вашему запросу билетов не нашлось.
        </div>
      )}
    </div>
  );
};

export default TicketsList;
