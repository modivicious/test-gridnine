import React, { FC } from 'react';
import dayjs from 'dayjs';

import RouteInfo from './RouteInfo';
import Timeline from './Timeline';
import Airline from './Airline';

import { toHoursAndMinutes } from '../../utils/functions';

import { FlightLeg } from '../../types';

import styles from './FlightDetails.module.scss';

const FlightDetails: FC<{ leg: FlightLeg }> = (props) => {
  const { leg } = props;

  const departureTime = dayjs(leg.departure.date).format('HH:mm');
  const departureDate = dayjs(leg.departure.date).format('DD MMM dd');
  const arrivalTime = dayjs(leg.arrival.date).format('HH:mm');
  const arrivalDate = dayjs(leg.arrival.date).format('DD MMM dd');
  const duration = toHoursAndMinutes(leg.duration);

  return (
    <div className={styles.flightDetails}>
      <RouteInfo
        departureCity={leg.departure.city}
        departureAirportName={leg.departure.airport.name}
        departureAirportIata={leg.departure.airport.iata}
        arrivalCity={leg.arrival.city}
        arrivalAirportName={leg.arrival.airport.name}
        arrivalAirportIata={leg.arrival.airport.iata}
      />

      <Timeline
        departureTime={departureTime}
        departureDate={departureDate}
        arrivalTime={arrivalTime}
        arrivalDate={arrivalDate}
        duration={duration}
        layoversCount={leg.layoversCount}
      />

      <Airline airline={leg.arrival.airline} />
    </div>
  );
};

export default FlightDetails;
