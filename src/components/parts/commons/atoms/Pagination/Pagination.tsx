import React, { VFC, ComponentProps } from 'react';
import { Pagination as MuiPagination } from '@mui/material';

type Props = ComponentProps<typeof MuiPagination>;

export const Pagination: VFC<Props> = ({ ...rest }) => {
  return <MuiPagination {...rest} />;
};
