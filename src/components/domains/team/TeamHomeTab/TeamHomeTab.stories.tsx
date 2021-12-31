import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TeamHomeTab } from './TeamHomeTab';
import { createMockTeam, createMockUser } from '~/mocks/domains';
import { MDS } from '~/constants';

export default {
  title: 'domains/team/TeamHomeTab',
  component: TeamHomeTab,
} as ComponentMeta<typeof TeamHomeTab>;

const Template: ComponentStory<typeof TeamHomeTab> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <TeamHomeTab {...rest} />
    </div>
  );
};

const mockTeam = createMockTeam({ homeContent: MDS.SAMPLE_MD });
const mockUser = createMockUser();

export const EditModeTeamHomeTab = Template.bind({});
EditModeTeamHomeTab.args = {
  team: mockTeam,
  editable: true,
  currentUser: mockUser,
};

export const NotEditModeTeamHomeTab = Template.bind({});
NotEditModeTeamHomeTab.args = {
  ...EditModeTeamHomeTab.args,
  editable: false,
};
