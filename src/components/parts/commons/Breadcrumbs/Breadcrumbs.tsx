import React, { VFC } from 'react';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

import { Link } from '~/components/parts/commons';

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
              <span className="text-primary fs-4">{breadcrumbsItem.label}</span>
            </Link>
          );
        }
        return (
          <span className="fs-4" key={i}>
            {breadcrumbsItem.label}
          </span>
        );
      })}
    </MuiBreadcrumbs>
  );
};
