import React from 'react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default {
  title: 'typography',
};

const Template = () => (
  <Box display="flex" flexDirection="column" gap="20px">
    <Typography variant="h1">h1: 48px</Typography>
    <Typography variant="h2">h2: 32px</Typography>
    <Typography variant="h3">h3: 24px</Typography>
    <Typography variant="h4">h4: 20px</Typography>
    <Typography variant="body1">body1: 16px</Typography>
    <Typography variant="body2">body2: 14px</Typography>
    <Typography variant="button">button: 14px</Typography>
    <Typography variant="caption">caption: 12px</Typography>
    <Typography variant="overline">overline: 10px</Typography>
  </Box>
);

export const Default = Template.bind({});
