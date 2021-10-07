import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/system';

import { Divider } from '~/components/parts/commons/atoms/Divider';
import { Typography } from '~/components/parts/commons/atoms/Typography';
import { Card } from '~/components/parts/commons/atoms/Card';

export default {
  title: 'parts/commons/atoms/Divider',
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
        <Divider {...rest} margin={margin} orientation="vertical" flexItem />
        <Typography>Right Text</Typography>
      </Card>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  margin: 8,
};
