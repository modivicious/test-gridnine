import React from 'react';

import { transfersToDisplay } from '../../../constants';

import styles from './Timeline.module.scss';

interface ITimelineProps {
  arrivalTime: string;
  arrivalDate: string;
  departureTime: string;
  departureDate: string;
  duration: string;
  transfersCount?: number;
}

const Timeline = (props: ITimelineProps) => {
  const {
    departureTime,
    departureDate,
    arrivalTime,
    arrivalDate,
    duration,
    transfersCount = 0,
  } = props;

  return (
    <div className={styles.timeline}>
      <div className={styles.timeline__inner}>
        <div>
          <span className={styles.time}>{departureTime}</span>{' '}
          <span className={styles.date}>{departureDate}</span>
        </div>
        <div>🕓 {duration}</div>
        <div>
          <span className={styles.date}>{arrivalDate}</span>{' '}
          <span className={styles.time}>{arrivalTime}</span>
        </div>
      </div>

      <div className={styles.transfers}>
        <div className={styles.transfers__count}>
          {transfersToDisplay[transfersCount]}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
