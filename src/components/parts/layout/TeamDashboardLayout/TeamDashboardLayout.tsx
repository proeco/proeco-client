import { Box } from '@mui/system';
import { FC } from 'react';
import { DashboardModals } from '../DashboardModals';
import { TeamSideBar } from '~/components/domains/team/TeamSideBar';
import { LoginRequiredWrapper } from '~/components/parts/authentication/LoginRequiredWrapper';

export const TeamDashboardLayout: FC = ({ children }) => {
  return (
    <LoginRequiredWrapper>
      <Box display="flex">
        <Box flexShrink={1}>
          <TeamSideBar />
        </Box>
        <Box width="100%">{children}</Box>
      </Box>
      <DashboardModals />
    </LoginRequiredWrapper>
  );
};
