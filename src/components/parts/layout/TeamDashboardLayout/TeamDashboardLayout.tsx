import { Box, styled } from '@mui/system';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { TeamSideBar } from '~/components/domains/team/TeamSideBar';
import { LoginRequiredWrapper } from '~/components/parts/authentication/LoginRequiredWrapper';

// TODO util
const isString = (value: string | string[] | undefined): value is string => {
  const type = typeof value;
  return type === 'string' || (type === 'object' && value != null && !Array.isArray(value));
};

export const TeamDashboardLayout: FC = ({ children }) => {
  const router = useRouter();
  const teamId = router.query.teamId;

  return (
    <LoginRequiredWrapper>
      <Box display="flex">
        <Box flexShrink={1}>{isString(teamId) && <TeamSideBar teamId={teamId} />}</Box>
        <StyledBox p="40px" width="100%">
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
