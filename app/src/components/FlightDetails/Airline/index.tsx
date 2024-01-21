import React from 'react';

interface AirlineProps {
  airline: string;
}

import styles from './Airline.module.scss';

const Airline = ({ airline }: AirlineProps) => {
  return <div className={styles.airline}>Рейс выполняет: {airline}</div>;
};

export default Airline;
