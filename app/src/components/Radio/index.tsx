import React from 'react';

import styles from './Radio.module.scss';

export interface RadioProps {
  id: string;
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

const Radio = (props: RadioProps) => {
  const {id, label, name, value, checked, onChange} = props;

  return (
    <div className={styles.radioContainer}>
      <input
        className={styles.radio}
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
 
export default Radio;
