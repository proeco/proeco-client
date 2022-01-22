import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { NotificationBadge } from '.';

export default {
  title: 'domains/notification/NotificationBadge',
  component: NotificationBadge,
} as ComponentMeta<typeof NotificationBadge>;

const Template: ComponentStory<typeof NotificationBadge> = (args) => {
  return <NotificationBadge {...args} />;
};

export const Nothing = Template.bind({});
Nothing.args = {
  onClick: action('onClick'),
  count: 0,
};

export const Normal = Template.bind({});
Normal.args = {
  onClick: action('onClick'),
  count: 7,
};

export const Overflow = Template.bind({});
Overflow.args = {
  onClick: action('onClick'),
  count: 120,
};
