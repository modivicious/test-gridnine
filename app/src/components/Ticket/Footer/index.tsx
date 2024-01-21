import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <button className={styles.button} type="button">
        Выбрать
      </button>
    </div>
  );
};

export default Footer;
