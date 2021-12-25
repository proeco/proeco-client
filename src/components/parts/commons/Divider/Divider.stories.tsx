import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/system';

import { Divider, Card } from '~/components/parts/commons';

export default {
  title: 'parts/commons/Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = ({ margin, ...rest }) => {
  return (
    <Box>
      <p>Horizontal</p>
      <Card sx={{ width: '300px' }}>
        <p className="text-center">Text on the ine</p>
        <Divider {...rest} margin={margin} orientation="horizontal" />
        <p className="text-center">Text under the ine</p>
      </Card>
      <p>Vertical</p>
      <Card sx={{ width: '300px', display: 'flex' }}>
        <p>Left Text</p>
        <Divider {...rest} margin={margin} orientation="vertical" />
        <p>Right Text</p>
      </Card>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  margin: 8,
};
