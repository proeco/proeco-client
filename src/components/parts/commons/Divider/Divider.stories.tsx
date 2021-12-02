import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/system';

import { Divider, Typography, Card } from '~/components/parts/commons';

export default {
  title: 'parts/commons/Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = ({ margin, ...rest }) => {
  return (
    <Box>
      <Typography>Horizontal</Typography>
      <Card sx={{ width: '300px' }}>
        <Typography textAlign="center">Text on the ine</Typography>
        <Divider {...rest} margin={margin} orientation="horizontal" />
        <Typography textAlign="center">Text under the ine</Typography>
      </Card>
      <Typography>Vertical</Typography>
      <Card sx={{ width: '300px', display: 'flex' }}>
        <Typography>Left Text</Typography>
        <Divider {...rest} margin={margin} orientation="vertical" />
        <Typography>Right Text</Typography>
      </Card>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  margin: 8,
};
