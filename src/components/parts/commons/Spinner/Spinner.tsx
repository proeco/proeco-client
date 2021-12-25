import React, { VFC } from 'react';
import { ColorVariables } from '~/constants/colors';

type Props = {
  color?: ColorVariables;
};

export const Spinner: VFC<Props> = ({ color = 'primary' }) => {
  return (
    <div className={`spinner-border text-${color}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
