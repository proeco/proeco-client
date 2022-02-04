import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Dropdown, DropdownItem } from './Dropdown';

import { Icon } from '~/components/parts/commons';

export default {
  title: 'parts/commons/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <Dropdown {...rest}>
        <DropdownItem onClick={action('clickSettings')}>
          <Icon icon="GEAR" size={20} color="BLACK" />
          Settings
        </DropdownItem>
        <DropdownItem onClick={action('clickLogout')}>
          <Icon icon="REPLY" size={20} color="BLACK" />
          Logout
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  toggle: <Icon icon="THREE_DOTS_VERTICAL" size={24} color="BLACK" />,
};
