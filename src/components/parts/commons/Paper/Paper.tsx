import React, { FC } from 'react';

type Props = {
  square?: boolean;
};

export const Paper: FC<Props> = ({ children, square }) => {
  const classNames = ['p-3', 'bg-white', 'shadow'];
  if (square) classNames.push('rounded-2');

  return <div className={classNames.join(' ')}>{children}</div>;
};
