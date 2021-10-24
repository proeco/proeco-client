import React, { VFC, ComponentProps } from 'react';
import { IconButton as MuiIconButton } from '@mui/material';

type IconButtonType = {
  icon: string;
};

type Props = ComponentProps<typeof MuiIconButton> & IconButtonType;

export const IconButton: VFC<Props> = ({ ...rest }) => {
  return <MuiIconButton {...rest} />;
};
