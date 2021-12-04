import React, { VFC, ComponentProps } from 'react';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

type Props = ComponentProps<typeof MuiBreadcrumbs>;

export const Breadcrumbs: VFC<Props> = ({ children, ...rest }) => {
  return (
    <MuiBreadcrumbs separator="›" aria-label="breadcrumb" {...rest}>
      {children}
    </MuiBreadcrumbs>
  );
};
