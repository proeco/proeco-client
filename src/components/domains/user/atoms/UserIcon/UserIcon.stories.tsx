import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserIcon } from './UserIcon';

export default {
  title: 'user/atoms/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>;

const Template: ComponentStory<typeof UserIcon> = (args) => <UserIcon {...args} />;

export const Default = Template.bind({});
