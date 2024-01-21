import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { FLIGHTS, updateFlights } from '../../store/reducers/flights';
import { RootState } from '../../store';

import Ticket from '../Ticket';
import { Flight, FlightLeg, FlightSegment } from '../../types';

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

import styles from './TicketsList.module.scss';

const getSegmentInfo = (
  segment,
  flightType: 'arrival' | 'departure'
): FlightSegment => {
  return {
    date: segment[flightType + 'Date'],
    city: segment[flightType + 'City']?.caption || '',
    airport: {
      name: segment[flightType + 'Airport'].caption,
      iata: segment[flightType + 'Airport'].uid,
    },
    airline: segment.airline.caption,
  };
};

const getLegInfo = (leg): FlightLeg => {
  return {
    duration: Number(leg.duration),
    layoversCount: leg.segments.length - 1,
    departure: getSegmentInfo(leg.segments[0], 'departure'),
    arrival: getSegmentInfo(leg.segments[leg.segments.length - 1], 'arrival'),
  };
};

const parseFlights = (flightsData): Flight[] => {
  const flights = flightsData.result.flights;

  return flights.map(
    ({ flight }): Flight => ({
      price: Number(flight.price.total.amount),
      departInfo: getLegInfo(flight.legs[0]),
      returnInfo: getLegInfo(flight.legs[1]),
    })
  );
};

const TicketsList = () => {
  const dispatch = useAppDispatch();

  const flights = useAppSelector(
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

  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);

  const setCarriersData = (parsedFlights) => {
    const uniqueCarriers = parsedFlights.reduce((acc, flight) => {
      const airline = flight?.departInfo?.departure?.airline;

      if (!airline) {
        return acc;
      }

      const findedCarrier = acc[airline];

      if (findedCarrier) {
        if (flight.price < findedCarrier.minPrice) {
          findedCarrier.minPrice = flight.price;
        }
      } else {
        acc[airline] = {
          id: airline,
          name: airline,
          value: airline,
          minPrice: flight.price,
          checked: true,
        };
      }

      return acc;
    }, {});

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
      Object.values(sort).find((sortType) => sortType.checked)?.value || '';

    const checkedTransfers = Object.values(transfers)
      .filter((item) => item.checked)
      .map((item) => item.value);

    let filteredFlights = [...flights].sort(getSortFunctionByName(activeSort));

    filteredFlights = filteredFlights.filter((flight) =>
      checkedTransfers.includes(flight.departInfo.layoversCount)
    );

    filteredFlights = filteredFlights.filter(
      (flight) =>
        flight.price > priceRange[MIN_PRICE].value &&
        flight.price < priceRange[MAX_PRICE].value
    );

    const checkedCarriers = Object.values(carriers)
      .filter((carrier) => carrier.checked)
      .map((carrier) => carrier.name);

    filteredFlights = filteredFlights.filter((flight) =>
      checkedCarriers.includes(flight.departInfo.departure.airline)
    );

    setFilteredFlights(filteredFlights);
  }, [flights, sort, transfers, priceRange, carriers]);

  return (
    <ul className={styles.tickets}>
      {filteredFlights.map((flight: Flight, index) => (
        <li className={styles.tickets__item} key={index}>
          <Ticket flight={flight} />
        </li>
      ))}
    </ul>
  );
};

export default TicketsList;
