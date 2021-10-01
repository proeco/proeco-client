import React, { VFC, ComponentProps } from 'react';
import { Typography as MuiTypography } from '@mui/material';

type Bold = {
  bold?: boolean;
};

type Props = ComponentProps<typeof MuiTypography> & Bold;

export const Typography: VFC<Props> = ({ bold, ...rest }) => {
  return <MuiTypography sx={{ textTransform: 'none', fontWeight: `${bold ? 'bold' : 'normal'}` }} {...rest} />;
};
