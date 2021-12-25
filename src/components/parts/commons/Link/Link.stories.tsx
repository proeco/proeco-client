import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Link } from './Link';

export default {
  title: 'parts/commons/Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = ({ ...rest }) => {
  return (
    <Box>
      <Link {...rest}>
        <p>Linkのテキスト</p>
      </Link>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  href: '/',
  isShowUnderLine: true,
};
