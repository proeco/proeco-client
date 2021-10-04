import React, { VFC, ComponentProps } from 'react';
import { Card as MuiCard } from '@mui/material';

type Card = {
  padding?: number;
  square?: boolean;
};

type Props = ComponentProps<typeof MuiCard> & Card;

export const Card: VFC<Props> = ({ padding = 20, square = false, ...rest }) => {
  return (
    <MuiCard
      sx={{
        width: 'fit-content',
        padding: `${padding}px`,
        borderRadius: `${square ? '0px' : '4px'}`,
      }}
      {...rest}
    />
  );
};
