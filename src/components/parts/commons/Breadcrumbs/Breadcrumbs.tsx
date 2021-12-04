import React, { VFC, ComponentProps } from 'react';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

import { Link, Typography } from '~/components/parts/commons';

type BreadcrumbsType = {
  BreadcrumbsItems: Array<{
    url?: string;
    label: string;
  }>;
};

type Props = ComponentProps<typeof MuiBreadcrumbs> & BreadcrumbsType;

export const Breadcrumbs: VFC<Props> = ({ BreadcrumbsItems, ...rest }) => {
  return (
    <MuiBreadcrumbs separator="›" aria-label="breadcrumb" {...rest}>
      {BreadcrumbsItems.map((BreadcrumbsItem, i) => {
        if (BreadcrumbsItem.url) {
          return (
            <Link href={BreadcrumbsItem.url} key={i} size={12}>
              {BreadcrumbsItem.label}
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
