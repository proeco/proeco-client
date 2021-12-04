import { VFC } from 'react';
import { DeleteStoryModal } from '~/components/domains/story/DeleteStoryModal';
import { UpdateStoryModal } from '~/components/domains/story/UpdateStoryModal';

export const DashboardModals: VFC = () => {
  return (
    <>
      <UpdateStoryModal />
      <DeleteStoryModal />
    </>
  );
};
