import React, {useState} from 'react';

import styles from './InputNumber.module.scss';

interface InputNumberProps {
  id: string;
  name: string;
  value: number;
  label: string;
  onChange: (e) => void;
}

const InputNumber = (props: InputNumberProps) => {
  const { id, name, value, label, onChange } = props;

  const [numberValue, setNumberValue] = useState(value);

  const onNumberChange = (e) => {
    setNumberValue(Number(e.target.value));

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.inputNumberContainer}>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.inputNumber}
        id={id}
        name={name}
        type="number"
        min={0}
        max={9999999}
        value={numberValue}
        onChange={onNumberChange}
      />
    </div>
  );
};
 
export default InputNumber;
