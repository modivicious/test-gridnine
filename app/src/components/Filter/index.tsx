import React from 'react';

import styles from './Filter.module.scss';

interface FilterProps {
  children: any;
  title: string;
}

const Filter = (props: FilterProps) => {
  const { children, title } = props;
  return (
    <div className={styles.filter}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Filter;
