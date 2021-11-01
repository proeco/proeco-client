import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Icon } from './Icon';

export default {
  title: 'parts/commons/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ({ ...rest }) => {
  return (
    <Box>
      <Icon {...rest} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  icon: 'Update',
  width: 24,
};
