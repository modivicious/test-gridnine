import React from 'react';

import styles from './Radio.module.scss';

export interface IRadioProps {
  id: string;
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = (props: IRadioProps) => {
  const { id, label, name, value, checked, onChange } = props;

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.radioContainer}>
      <input
        className={styles.radio}
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onCheck}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Radio;
