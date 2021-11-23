import React, { VFC } from 'react';
import { Box } from '@mui/system';

type Props = {};

export const Editor: VFC<Props> = ({ ...rest }) => {
  return <Box {...rest}></Box>;
};
