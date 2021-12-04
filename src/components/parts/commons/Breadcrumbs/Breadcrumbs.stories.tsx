import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { Breadcrumbs } from './Breadcrumbs';
import { Link, Typography } from '~/components/parts/commons';

export default {
  title: 'parts/commons/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <Breadcrumbs {...rest}>
        <Link href="#">team</Link>
        <Link href="#">story</Link>
        <Typography color="text.primary">storyPost</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export const Default = Template.bind({});
