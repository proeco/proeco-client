import React, { FC } from 'react';
import { ColorVariables } from '~/constants/colors';

type Props = {
  disabled?: boolean;
  size?: 'sm' | 'lg';
  color: ColorVariables;
  outlined?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
};

export const Button: FC<Props> = ({ children, disabled, size, color, outlined, fullWidth, onClick }) => {
  const classNames = ['btn text-nowrap text-truncate fw-bold d-inline-flex align-items-center gap-1'];
  if (disabled) classNames.push('disabled');
  if (size) classNames.push(`btn-${size}`);
  if (outlined) {
    classNames.push(`btn-outline-${color}`);
  } else {
    classNames.push(`btn-${color}`);
  }
  if (fullWidth) classNames.push('w-100 justify-content-center');

  return (
    <button type="button" className={classNames.join(' ')} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
