import React, { ReactNode } from 'react';

import styles from './Filter.module.scss';

interface IFilterProps {
  children: ReactNode;
  title: string;
}

const Filter = (props: IFilterProps) => {
  const { children, title } = props;
  return (
    <div className={styles.filter}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Filter;
