import React from 'react';

import styles from './RouteInfo.module.scss';

interface IRouteInfoProps {
  arrivalCity: string;
  arrivalAirportName: string;
  arrivalAirportIata: string;
  departureCity: string;
  departureAirportName: string;
  departureAirportIata: string;
}

const RouteInfo = (props: IRouteInfoProps) => {
  const {
    departureCity,
    departureAirportName,
    departureAirportIata,
    arrivalCity,
    arrivalAirportName,
    arrivalAirportIata,
  } = props;

  return (
    <div className={styles.route}>
      {departureCity}, {departureAirportName}{' '}
      <span className={styles.airportIata}>({departureAirportIata})</span>
      <span className={styles.arrow}> → </span>
      {arrivalCity}, {arrivalAirportName}{' '}
      <span className={styles.airportIata}>({arrivalAirportIata})</span>
    </div>
  );
};

export default RouteInfo;
