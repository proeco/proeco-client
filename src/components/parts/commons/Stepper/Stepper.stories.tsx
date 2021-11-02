import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Stepper } from './Stepper';

export default {
  title: 'parts/commons/Stepper',
  component: Stepper,
} as ComponentMeta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = ({ steps, activeStep, ...rest }) => {
  return (
    <Box maxWidth="600px" width="100%">
      <Stepper steps={steps} activeStep={activeStep} {...rest}></Stepper>
    </Box>
  );
};

export const threeStep = Template.bind({});
threeStep.args = {
  activeStep: 0,
  steps: ['１番目', '２番目', '３番目'],
};

export const fiveStep = Template.bind({});
fiveStep.args = {
  activeStep: 0,
  steps: ['１番目', '２番目', '３番目', '４番目', '５番目'],
};
