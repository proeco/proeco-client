import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TeamSettingTab } from './TeamSettingTab';
import { createMockTeam, createMockUser } from '~/mocks/domains';

export default {
  title: 'domains/team/TeamSettingTab',
  component: TeamSettingTab,
} as ComponentMeta<typeof TeamSettingTab>;

const Template: ComponentStory<typeof TeamSettingTab> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <TeamSettingTab {...rest} />
    </div>
  );
};

const mockUser = createMockUser();
const mockTeam = createMockTeam();

export const Default = Template.bind({});
Default.args = {
  currentUser: mockUser,
  team: mockTeam,
};
