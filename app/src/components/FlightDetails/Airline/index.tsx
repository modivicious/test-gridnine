import React from 'react';

import styles from './Airline.module.scss';

interface IAirlineProps {
  airline: string;
}

const Airline = ({ airline }: IAirlineProps) => {
  return <div className={styles.airline}>Рейс выполняет: {airline}</div>;
};

export default Airline;
