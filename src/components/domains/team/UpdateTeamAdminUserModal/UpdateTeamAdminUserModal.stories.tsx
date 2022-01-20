import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UpdateTeamAdminUserModal } from './UpdateTeamAdminUserModal';
import { createMockTeam, createMockUser } from '~/mocks/domains';

export default {
  title: 'domains/team/UpdateTeamAdminUserModal',
  component: UpdateTeamAdminUserModal,
  argTypes: {
    onCloseModal: { action: 'onCloseModal' },
  },
} as ComponentMeta<typeof UpdateTeamAdminUserModal>;

const Template: ComponentStory<typeof UpdateTeamAdminUserModal> = (args) => {
  return <UpdateTeamAdminUserModal {...args} />;
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
