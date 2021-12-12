import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NavigationBar } from '~/components/parts/layout/NavigationBar';

export default {
  title: 'parts/layout/NavigationBar',
  component: NavigationBar,
  argTypes: { onClose: { action: 'onClickLoginButton' } },
} as ComponentMeta<typeof NavigationBar>;

const Template: ComponentStory<typeof NavigationBar> = () => {
  return <NavigationBar />;
};

export const Default = Template.bind({});
