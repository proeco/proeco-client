import React, { VFC } from 'react';
import { Pagination as PaginationOriginal, PaginationItem, PaginationLink } from 'reactstrap';

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
      <PaginationItem>
        <PaginationLink previous href="#" onClick={() => onChange(page - 1 < 1 ? null : page - 1)} />
      </PaginationItem>
      {countArr.map((num) => (
        <PaginationItem key={num} active={page === num}>
          <PaginationLink href="#" onClick={() => onChange(num)}>
            {num}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink next href="#" onClick={() => onChange(page + 1 > count ? null : page + 1)} />
      </PaginationItem>
    </PaginationOriginal>
  );
};
