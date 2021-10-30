import { VFC } from 'react';
import { CreateNewStoryModal, DeleteStoryModal, UpdateStoryModal } from '~/components/domains/story/organisms';

export const DashboardModals: VFC = () => {
  return (
    <>
      <CreateNewStoryModal />
      <UpdateStoryModal />
      <DeleteStoryModal />
    </>
  );
};
