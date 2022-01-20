import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UpdateAdminUserOfTeamModal } from './UpdateAdminUserOfTeamModal';
import { createMockTeam, createMockUser } from '~/mocks/domains';

export default {
  title: 'domains/team/UpdateAdminUserOfTeamModal',
  component: UpdateAdminUserOfTeamModal,
  argTypes: {
    onCloseModal: { action: 'onCloseModal' },
  },
} as ComponentMeta<typeof UpdateAdminUserOfTeamModal>;

const Template: ComponentStory<typeof UpdateAdminUserOfTeamModal> = (args) => {
  return <UpdateAdminUserOfTeamModal {...args} />;
};

const mockUser = createMockUser();
const mockTeam = createMockTeam();

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
  userId: mockUser._id,
  userName: mockUser.name,
  teamId: mockTeam._id,
};
