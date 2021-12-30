import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Pagination } from '~/components/parts/commons';

export default {
  title: 'parts/commons/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = ({ count }) => {
  const [page, setPage] = useState(1);

  const handleChangePage = (value: number | null) => {
    if (!value) return;
    setPage(value);
  };
  return (
    <div>
      <p>page: {page}</p>
      <Pagination count={count} page={page} onChange={handleChangePage} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  count: 10,
};
