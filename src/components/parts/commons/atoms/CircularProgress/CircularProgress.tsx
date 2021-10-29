import React, { VFC } from 'react';
import MuiCircularProgress from '@mui/material/CircularProgress';

type CircularProgressProps = {};
type Props = CircularProgressProps & Partial<typeof MuiCircularProgress>;

export const CircularProgress: VFC<Props> = ({ ...props }) => {
  return <MuiCircularProgress {...props} />;
};
