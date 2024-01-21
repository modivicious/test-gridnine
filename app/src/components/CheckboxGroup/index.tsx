import React, { FC } from 'react';

import Checkbox from '../Checkbox';
import { CheckboxProps } from '../Checkbox';

const CheckboxGroup: FC<{ checkboxes: CheckboxProps[]; onChange }> = (props) => {
  const { checkboxes, onChange } = props;

  return (
    <div>
      {checkboxes.map((checkbox) => (
        <Checkbox
          key={checkbox.id}
          id={checkbox.id}
          label={checkbox.label}
          customCaption={checkbox.customCaption}
          name={checkbox.name}
          value={checkbox.value}
          checked={checkbox.checked}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;
