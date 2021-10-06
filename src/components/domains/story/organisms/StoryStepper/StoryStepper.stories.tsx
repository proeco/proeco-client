import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { StoryStepper } from './StoryStepper';

export default {
  title: 'domains/story/organisms/StoryStepper',
  component: StoryStepper,
} as ComponentMeta<typeof StoryStepper>;

const Template: ComponentStory<typeof StoryStepper> = ({ activeStep, ...rest }) => {
  return (
    <Box maxWidth="600px" width="100%">
      <StoryStepper activeStep={activeStep} {...rest}></StoryStepper>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  activeStep: 0,
};
