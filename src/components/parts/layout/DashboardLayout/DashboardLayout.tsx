import { Box } from '@mui/system';
import { FC } from 'react';
import { UserSideBar } from '../../../domains/user/UserSideBar';
import { LoginRequiredWrapper } from '~/components/parts/authentication/LoginRequiredWrapper';

export const DashBoardLayout: FC = ({ children }) => {
  return (
    <LoginRequiredWrapper>
      <Box display="flex">
        <Box flexShrink={1}>
          <UserSideBar />
        </Box>
        <Box width="100%">{children}</Box>
      </Box>
    </LoginRequiredWrapper>
  );
};
