import React, { ComponentProps, VFC } from 'react';
import MuiCircularProgress from '@mui/material/CircularProgress';

type CircularProgress = {};
type Props = ComponentProps<typeof MuiCircularProgress> & CircularProgress;

export const CircularProgress: VFC<Props> = (props) => {
  return <MuiCircularProgress {...props} />;
};
