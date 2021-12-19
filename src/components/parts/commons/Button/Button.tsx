import React, { FC } from 'react';
import { ColorVariables } from '~/constants/colors';

type Props = {
  disabled?: boolean;
  size?: 'sm' | 'lg';
  color: ColorVariables;
  outlined?: boolean;
};

export const Button: FC<Props> = ({ children, disabled, size, color, outlined }) => {
  const classNames = ['btn'];
  if (disabled) classNames.push('disabled');
  if (size) classNames.push(`btn-${size}`);
  if (outlined) {
    classNames.push(`btn-${color}`);
  } else {
    classNames.push(`btn-outline-${color}`);
  }

  return (
    <button type="button" className={classNames.join(' ')}>
      {children}
    </button>
  );
};
