import React, { FC, useState } from 'react';

import Radio from '../Radio';
import { IRadioProps } from '../Radio';

const RadioGroup: FC<{
  radios: IRadioProps[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const { radios, onChange } = props;

  const initialActiveValue =
    radios.find((radio: IRadioProps) => radio.checked)?.value || radios[0].value;

  const [activeValue, setActiveValue] = useState(initialActiveValue);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveValue(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div>
      {radios.map((radio) => (
        <Radio
          key={radio.id}
          id={radio.id}
          label={radio.label}
          name={radio.name}
          value={radio.value}
          checked={activeValue === radio.value}
          onChange={onValueChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
