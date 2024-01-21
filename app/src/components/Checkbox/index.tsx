import React, { useState } from 'react';

import styles from './Checkbox.module.scss';

export interface CheckboxProps {
  id: string;
  label?: string;
  customCaption?: any;
  name: string;
  value: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const { id, label, customCaption, name, value, checked, onChange } = props;

  const [isChecked, setIsChecked] = useState(checked);

  const onCheck = (e) => {
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
