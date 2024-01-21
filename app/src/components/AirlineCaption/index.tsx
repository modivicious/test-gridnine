import React from 'react';

import styles from './AirlineCaption.module.scss';

const AirlineCaption = (props) => {
  const {airline, price} = props;

  return (
    <div className={styles.caption}>
      <div className={styles.airline}>{airline}</div>
      <div className={styles.price}>{price}</div>
    </div>
  );
}
 
export default AirlineCaption;
