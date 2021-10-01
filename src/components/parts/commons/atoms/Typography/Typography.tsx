import React, { VFC, ComponentProps } from 'react';
import { Typography as MuiTypography } from '@mui/material';

type Props = ComponentProps<typeof MuiTypography>;

export const Typography: VFC<Props> = ({ ...rest }) => {
  return <MuiTypography {...rest} />;
};
