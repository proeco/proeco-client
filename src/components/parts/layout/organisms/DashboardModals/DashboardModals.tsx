import { VFC } from 'react';
import { CreateNewStoryModal } from '~/components/domains/story/organisms';
import { UpdateStoryModal } from '~/components/domains/story/organisms/UpdateStoryModal';

export const DashboardModals: VFC = () => {
  return (
    <>
      <CreateNewStoryModal />
      <UpdateStoryModal />
    </>
  );
};
