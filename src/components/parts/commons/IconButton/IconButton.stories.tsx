import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { IconButton } from './IconButton';

export default {
  title: 'parts/commons/IconButton',
  component: IconButton,
  argTypes: { onClick: { action: 'onClick' } },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = ({ ...rest }) => {
  return (
    <Box>
      <IconButton {...rest} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  icon: 'Update',
  width: 24,
};
