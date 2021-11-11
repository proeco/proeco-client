import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Icon, IconMap } from './Icon';

export default {
  title: 'parts/commons/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ({ ...rest }) => {
  return (
    <Box display="flex" gap="8px">
      {Object.keys(IconMap).map((v, index) => {
        return <Icon key={index} {...rest} icon={v as keyof typeof IconMap} />;
      })}
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  width: 24,
};
