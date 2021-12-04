import React, { VFC } from 'react';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

import { Link, Typography } from '~/components/parts/commons';

type Props = {
  breadcrumbsItems: Array<{
    url?: string;
    label: string;
  }>;
};

export const Breadcrumbs: VFC<Props> = ({ breadcrumbsItems }) => {
  return (
    <MuiBreadcrumbs separator="›" aria-label="breadcrumb">
      {breadcrumbsItems.map((breadcrumbsItem, i) => {
        if (breadcrumbsItem.url) {
          return (
            <Link href={breadcrumbsItem.url} key={i}>
              <Typography variant="caption" color="primary.main">
                {breadcrumbsItem.label}
              </Typography>
            </Link>
          );
        }
        return (
          <Typography variant="caption" key={i}>
            {breadcrumbsItem.label}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
};
