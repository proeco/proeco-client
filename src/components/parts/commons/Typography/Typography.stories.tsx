import React from 'react';

import { Box } from '@mui/system';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Typography } from './Typography';

export default {
  title: 'parts/commons/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = ({ ...rest }) => (
  <Box display="flex" flexDirection="column" gap="20px">
    <Typography variant="h1" {...rest}>
      h1: 48px
    </Typography>
    <Typography variant="h2" {...rest}>
      h2: 32px
    </Typography>
    <Typography variant="h3" {...rest}>
      h3: 24px
    </Typography>
    <Typography variant="h4" {...rest}>
      h4: 20px
    </Typography>
    <Typography variant="body1" {...rest}>
      body1: 16px
    </Typography>
    <Typography variant="body2" {...rest}>
      body2: 14px
    </Typography>
    <Typography variant="button" {...rest}>
      button: 14px
    </Typography>
    <Typography variant="caption" {...rest}>
      caption: 12px
    </Typography>
    <Typography variant="overline" {...rest}>
      overline: 10px
    </Typography>
  </Box>
);

const LongTextTemplate: ComponentStory<typeof Typography> = ({ ...rest }) => (
  <Box width="300px" p="20px">
    <Typography variant="h3" {...rest}>
      Proeco は、個人開発やチーム開発を応援するWEBアプリケーションです！
    </Typography>
  </Box>
);

export const DefaultTypography = Template.bind({});

export const LongTextTypography = LongTextTemplate.bind({});
LongTextTypography.args = {
  maximumLines: 2,
};
