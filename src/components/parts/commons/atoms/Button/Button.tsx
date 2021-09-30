import React, { VFC, ComponentProps } from 'react';
import { Button as MuiButton } from '@mui/material';

type Props = ComponentProps<typeof MuiButton>;

export const Button: VFC<Props> = ({ ...rest }) => {
  return <MuiButton {...rest} />;
};
