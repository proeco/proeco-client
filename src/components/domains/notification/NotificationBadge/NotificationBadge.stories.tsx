import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { NotificationBadge } from '.';
import { createMockNotification } from '~/mocks/domains';

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
  notifications: [],
};

export const Normal = Template.bind({});
Normal.args = {
  onClick: action('onClick'),
  notifications: [...Array(7)].map(() => createMockNotification()),
};

export const Overflow = Template.bind({});
Overflow.args = {
  onClick: action('onClick'),
  notifications: [...Array(100)].map(() => createMockNotification()),
};
