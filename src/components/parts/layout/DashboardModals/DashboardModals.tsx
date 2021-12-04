import { VFC } from 'react';
import { DeleteStoryModal } from '~/components/domains/story/DeleteStoryModal';

export const DashboardModals: VFC = () => {
  return (
    <>
      <DeleteStoryModal />
    </>
  );
};
