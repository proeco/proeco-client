import { Box, styled } from '@mui/system';
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
        <StyledBox width="100%" p={5}>
          {children}
        </StyledBox>
      </Box>
    </LoginRequiredWrapper>
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
