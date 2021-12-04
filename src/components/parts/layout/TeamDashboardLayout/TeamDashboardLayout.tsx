import { Box } from '@mui/system';
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
        <Box width="100%">{children}</Box>
      </Box>
    </LoginRequiredWrapper>
  );
};
