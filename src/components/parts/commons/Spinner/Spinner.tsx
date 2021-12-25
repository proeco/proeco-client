import React, { VFC } from 'react';
import { ColorVariables } from '~/constants/colors';

type Props = {
  color?: ColorVariables;
  isSmall?: boolean;
};

export const Spinner: VFC<Props> = ({ color = 'primary', isSmall = false }) => {
  return (
    <div className={`spinner-border text-${color} ${isSmall ? 'spinner-border-sm' : ''}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
