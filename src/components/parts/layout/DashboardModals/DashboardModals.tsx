import { VFC } from 'react';
import { CreateNewStoryModal } from '~/components/domains/story/CreateNewStoryModal';
import { DeleteStoryModal } from '~/components/domains/story/DeleteStoryModal';
import { UpdateStoryModal } from '~/components/domains/story/UpdateStoryModal';
import { CreateNewStoryTaskModal } from '~/components/domains/storyTask/CreateNewStoryTaskModal';
import { DeleteStoryTaskModal } from '~/components/domains/storyTask/DeleteStoryTaskModal';

export const DashboardModals: VFC = () => {
  return (
    <>
      <CreateNewStoryModal />
      <UpdateStoryModal />
      <DeleteStoryModal />
      <CreateNewStoryTaskModal />
      <DeleteStoryTaskModal />
    </>
  );
};
