import { Box, styled } from '@mui/system';
import { FC } from 'react';
import { UserSideBar } from '../../../domains/user/UserSideBar';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

export const DashboardLayout: FC = ({ children }) => {
  const { data: currentUser } = useCurrentUser();
  return (
    <Box display="flex">
      {currentUser && (
        <Box flexShrink={1}>
          <UserSideBar currentUser={currentUser} />
        </Box>
      )}
      <StyledBox width="100%" minWidth="0" p={5}>
        {children}
      </StyledBox>
    </Box>
  );
};

const StyledBox = styled(Box)`
  /*
   * モバイルではサイドバーを表示しない
   */
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    padding: 12px;
  }
`;
