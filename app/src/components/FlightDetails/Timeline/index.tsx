import React from 'react';

import styles from './Timeline.module.scss';

interface TimelineProps {
  arrivalTime: string;
  arrivalDate: string;
  departureTime: string;
  departureDate: string;
  duration: string;
  layoversCount?: number;
}

const layoversToDisplay = [
  'без пересадок',
  '1 пересадка',
  '2 пересадки',
  '3 пересадки',
];

const Timeline = (props: TimelineProps) => {
  const {
    departureTime,
    departureDate,
    arrivalTime,
    arrivalDate,
    duration,
    layoversCount = 0,
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

      <div className={styles.layovers}>
        <div className={styles.layovers__count}>
          {layoversToDisplay[layoversCount]}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
