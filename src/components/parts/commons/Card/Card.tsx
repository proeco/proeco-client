import React, { FC } from 'react';

type Props = {
  imagePath?: string;
};

export const Card: FC<Props> = ({ imagePath, children }) => {
  const classNames = ['card border-0 shadow text-black overflow-hidden'];
  return (
    <div className={classNames.join(' ')}>
      {imagePath && <img src={imagePath} className="card-img-top h-auto" alt="card-img-top" width="1200" height="630" />}
      <div className="card-body p-3 position-relative">{children}</div>
    </div>
  );
};
