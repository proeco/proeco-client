import React, { FC } from 'react';

type Props = {
  imagePath?: string;
};

export const Card: FC<Props> = ({ imagePath, children }) => {
  const classNames = ['card border-0 shadow text-black overflow-hidden'];
  return (
    <div className={classNames.join(' ')}>
      {imagePath && <img src={imagePath} className="card-img-top" alt="card-img-top" />}
      <div className="card-body p-3">{children}</div>
    </div>
  );
};
