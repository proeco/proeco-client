import React, { ComponentProps, VFC } from 'react';
import MuiCircularProgress from '@mui/material/CircularProgress';

type Props = ComponentProps<typeof MuiCircularProgress>;

export const CircularProgress: VFC<Props> = (props) => {
  return <MuiCircularProgress {...props} />;
};
