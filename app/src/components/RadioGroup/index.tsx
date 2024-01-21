import React, { FC, useState } from 'react';

import Radio from '../Radio';
import { RadioProps } from '../Radio';

const RadioGroup: FC<{ radios: RadioProps[]; onChange }> = (props) => {
  const { radios, onChange } = props;

  const initialActiveValue =
    radios.find((radio: RadioProps) => radio.checked)?.value || radios[0].value;

  const [activeValue, setActiveValue] = useState(initialActiveValue);

  const onValueChange = (newValue: string) => {
    setActiveValue(newValue);
    onChange(newValue);
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
