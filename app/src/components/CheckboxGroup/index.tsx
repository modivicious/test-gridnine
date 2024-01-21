import React, { FC } from 'react';

import Checkbox from '../Checkbox';
import { ICheckboxProps } from '../Checkbox';

const CheckboxGroup: FC<{
  checkboxes: ICheckboxProps[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
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
