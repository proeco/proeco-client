import React, { VFC } from 'react';

import { Link } from '~/components/parts/commons';

type Props = {
  breadcrumbsItems: Array<{
    url?: string;
    label: string;
  }>;
};

export const Breadcrumbs: VFC<Props> = ({ breadcrumbsItems }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbsItems.map((breadcrumbsItem, i) => {
          if (breadcrumbsItem.url) {
            return (
              <li className="breadcrumb-item" key={i}>
                <Link href={breadcrumbsItem.url}>
                  <span className="text-primary fs-2">{breadcrumbsItem.label}</span>
                </Link>
              </li>
            );
          }
          return (
            <li className="breadcrumb-item" key={i}>
              <span className="fs-2">{breadcrumbsItem.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
