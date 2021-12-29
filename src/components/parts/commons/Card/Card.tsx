import React, { FC, ReactNode } from 'react';

type Props = {
  headerContent?: ReactNode;
};

export const Card: FC<Props> = ({ headerContent, children }) => {
  return (
    <div className="card border-0 shadow text-black overflow-hidden">
      {headerContent}
      <div className="card-body p-3 position-relative">{children}</div>
    </div>
  );
};
