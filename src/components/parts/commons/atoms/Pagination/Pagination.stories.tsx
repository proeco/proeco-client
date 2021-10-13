import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Pagination } from '~/components/parts/commons/atoms/Pagination';

export default {
  title: 'parts/commons/atoms/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = ({ count, ...rest }) => {
  return <Pagination count={count} {...rest} />;
};

export const Default = Template.bind({});
Default.args = {
  count: 10,
};
