import React, { ChangeEvent, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Stack } from '@mui/material';
import { Pagination, Typography } from '~/components/parts/commons/atoms';

export default {
  title: 'parts/commons/atoms/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = ({ count, ...rest }) => {
  const [page, setPage] = useState(1);

  const handleChangePage = (event: ChangeEvent<unknown>, value: number | null) => {
    if (!value) return;
    setPage(value);
  };
  return (
    <Stack spacing={2}>
      <Typography>page: {page}</Typography>
      <Pagination count={count} page={page} onChange={handleChangePage} {...rest} />
    </Stack>
  );
};

export const Default = Template.bind({});
Default.args = {
  count: 10,
};
