import React, { VFC, ComponentProps } from 'react';
import { Pagination as MuiPagination } from '@mui/material';

type Props = ComponentProps<typeof MuiPagination>;

export const Pagination: VFC<Props> = ({ color = 'primary', ...rest }) => {
  return <MuiPagination color={color} {...rest} />;
};
