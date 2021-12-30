import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'parts/commons/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <div className="d-flex gap-3">
    <div>
      <Button size="sm" {...args}>
        Button!
      </Button>
    </div>
    <div>
      <Button {...args}>Button!</Button>
    </div>
    <div>
      <Button size="lg" {...args}>
        Button!
      </Button>
    </div>
  </div>
);

export const Contained = Template.bind({});
Contained.args = {
  color: 'primary',
  disabled: false,
  outlined: true,
};

export const Outlined = Template.bind({});
Outlined.args = {
  color: 'primary',
  outlined: true,
  disabled: false,
};
