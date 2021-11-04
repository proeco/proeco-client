import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { IconMap } from '../Icon/Icon';
import { IconButton } from './IconButton';

export default {
  title: 'parts/commons/IconButton',
  component: IconButton,
  argTypes: { onClick: { action: 'onClick' } },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = ({ ...rest }) => {
  return (
    <Box display="flex" gap="8px">
      {Object.keys(IconMap).map((v, index) => {
        return <IconButton key={index} {...rest} icon={v as keyof typeof IconMap} />;
      })}
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  width: 24,
};
