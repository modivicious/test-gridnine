import React, { ReactNode, useState } from 'react';

import styles from './Checkbox.module.scss';

export interface ICheckboxProps {
  id: string;
  label?: string;
  customCaption?: ReactNode;
  name: string;
  value: string | number;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: ICheckboxProps) => {
  const { id, label, customCaption, name, value, checked, onChange } = props;

  const [isChecked, setIsChecked] = useState(checked);

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={onCheck}
      />
      {label ? (
        <label htmlFor={id}>{label}</label>
      ) : customCaption ? (
        customCaption
      ) : null}
    </div>
  );
};

export default Checkbox;
