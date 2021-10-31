import { Box } from '@mui/system';
import { FC } from 'react';
import { DashboardModals } from '../DashboardModals';
import { SideBar } from '../SideBar';

export const DashBoardLayout: FC = ({ children }) => {
  return (
    <>
      <Box display="flex">
        <Box flexShrink={1}>
          <SideBar />
        </Box>
        <Box width="100%">{children}</Box>
      </Box>
      <DashboardModals />
    </>
  );
};
