import React, { FC } from 'react';

import Header from './Header';
import Footer from './Footer';
import FlightDetails from '../FlightDetails';

import { Flight } from '../../types';

import styles from './Ticket.module.scss';

const Ticket: FC<{ flight: Flight }> = (props) => {
  const { flight } = props;

  return (
    <div className={styles.ticket}>
      <Header airline={flight.departInfo.departure.airline} price={flight.price} />
      <FlightDetails leg={flight.departInfo}/>
      <div className={styles.separator} />
      <FlightDetails leg={flight.returnInfo}/>
      <Footer />
    </div>
  );
};

export default Ticket;
