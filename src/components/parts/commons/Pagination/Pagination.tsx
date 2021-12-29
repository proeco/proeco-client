import React, { VFC } from 'react';
import { Pagination as PaginationOriginal, PaginationItem, PaginationLink } from 'reactstrap';
import styled from 'styled-components';

import { Icon } from '~/components/parts/commons';

type Props = {
  count: number;
  page: number;
  onChange: (value: number | null) => void;
};

export const Pagination: VFC<Props> = ({ count, page, onChange }) => {
  // [1, 2, 3, ..., count]のような連番の配列
  const countArr = [...Array(count)].map((_, i) => i + 1);

  return (
    <PaginationOriginal>
      <PaginationItem className="p-1">
        <StyledPaginationLink
          className="rounded-circle d-inline-flex justify-content-center align-items-center p-0 bg-transparent border-0"
          onClick={() => onChange(page - 1 < 1 ? null : page - 1)}
          tag="button"
        >
          <Icon icon="CHEVRON_LEFT" size={12} />
        </StyledPaginationLink>
      </PaginationItem>
      {countArr.map((num) => (
        <PaginationItem key={num} active={page === num} className="p-1">
          <StyledPaginationLink
            className={`rounded-circle d-inline-flex justify-content-center align-items-center p-0 border-0 ${
              page !== num && 'bg-transparent text-black'
            }`}
            onClick={() => onChange(num)}
            tag="button"
          >
            {num}
          </StyledPaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem className="p-1">
        <StyledPaginationLink
          className="rounded-circle d-inline-flex justify-content-center align-items-center p-0 border-0 bg-transparent"
          href="#"
          onClick={() => onChange(page + 1 > count ? null : page + 1)}
          tag="button"
        >
          <Icon icon="CHEVRON_RIGHT" size={12} />
        </StyledPaginationLink>
      </PaginationItem>
    </PaginationOriginal>
  );
};

const StyledPaginationLink = styled(PaginationLink)`
  min-width: 32px;
  height: 32px;
`;
