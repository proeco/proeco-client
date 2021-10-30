import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Link } from './Link';
import { Typography } from '~/components/parts/commons/Typography';

export default {
  title: 'parts/commons/atoms/Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = ({ ...rest }) => {
  return (
    <Box>
      <Link {...rest}>
        <Typography>Linkのテキスト</Typography>
      </Link>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  href: '/',
};
