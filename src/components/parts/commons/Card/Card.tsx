import React, { FC } from 'react';

type Padding = 0 | 1 | 2 | 3 | 4 | 5;

type Props = {
  padding?: Padding;
  square?: boolean;
};

export const Card: FC<Props> = ({ padding = 3, square = false, children }) => {
  const classNames = ['card border-0 shadow text-black overflow-hidden'];
  if (square) classNames.push('rounded-0');
  return (
    <div className={classNames.join(' ')}>
      <div className={`card-body p-${padding}`}>{children}</div>
    </div>
  );
};
