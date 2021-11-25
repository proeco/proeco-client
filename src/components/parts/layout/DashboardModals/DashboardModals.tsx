import { VFC } from 'react';
import { CreateNewStoryModal } from '~/components/domains/story/CreateNewStoryModal';
import { DeleteStoryModal } from '~/components/domains/story/DeleteStoryModal';
import { UpdateStoryModal } from '~/components/domains/story/UpdateStoryModal';
import { CreateNewStoryPostModal } from '~/components/domains/storyPost/CreateNewStoryPostModal';
import { DeleteStoryPostModal } from '~/components/domains/storyPost/DeleteStoryPostModal';

export const DashboardModals: VFC = () => {
  return (
    <>
      <CreateNewStoryModal />
      <UpdateStoryModal />
      <DeleteStoryModal />
      <CreateNewStoryPostModal />
      <DeleteStoryPostModal />
    </>
  );
};
