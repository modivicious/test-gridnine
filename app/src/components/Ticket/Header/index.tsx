import React from 'react';

import styles from './Header.module.scss';

interface IHeaderProps {
  airline: string;
  price: number;
}

const Header = (props: IHeaderProps) => {
  const { airline, price } = props;

  return (
    <div className={styles.header}>
      <div className={styles.airline}>{airline}</div>
      <div className={styles.price}>
        <div className={styles.total}>{price} ₽</div>
        <div className={styles.passengerType}>
          Стоимость за одного взрослого пассажира
        </div>
      </div>
    </div>
  );
};

export default Header;
