import React, { VFC } from 'react';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

import { Link, Typography } from '~/components/parts/commons';

type Props = {
  BreadcrumbsItems: Array<{
    url?: string;
    label: string;
  }>;
};

export const Breadcrumbs: VFC<Props> = ({ BreadcrumbsItems }) => {
  return (
    <MuiBreadcrumbs separator="›" aria-label="breadcrumb">
      {BreadcrumbsItems.map((BreadcrumbsItem, i) => {
        if (BreadcrumbsItem.url) {
          return (
            <Link href={BreadcrumbsItem.url} key={i}>
              <Typography variant="caption" color="primary.main">
                {BreadcrumbsItem.label}
              </Typography>
            </Link>
          );
        }
        return (
          <Typography variant="caption" key={i}>
            {BreadcrumbsItem.label}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
};
