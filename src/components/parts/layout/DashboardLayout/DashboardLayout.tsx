import { FC } from 'react';
import { DashboardModals } from '../DashboardModals';
import { SideBar } from '../SideBar';

export const DashBoardLayout: FC = ({ children }) => {
  return (
    <>
      <SideBar />
      {children}
      <DashboardModals />
    </>
  );
};
