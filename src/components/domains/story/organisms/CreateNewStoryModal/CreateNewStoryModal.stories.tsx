import React, { useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { CreateNewStoryModal } from './CreateNewStoryModal';
import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';

export default {
  title: 'domains/story/organisms/CreateNewStoryModal',
  component: CreateNewStoryModal,
} as ComponentMeta<typeof CreateNewStoryModal>;

const Template: ComponentStory<typeof CreateNewStoryModal> = () => {
  const { mutate } = useIsOpenCreateNewStoryModal();

  useEffect(() => {
    mutate(true);
  }, []);

  return (
    <Box>
      <CreateNewStoryModal />
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {};
