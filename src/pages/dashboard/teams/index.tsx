import { Box, styled } from '@mui/system';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Button, Icon, Link, Typography } from '~/components/parts/commons';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';

import { URLS } from '~/constants';

import { useTeams } from '~/stores/team';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamCard } from '~/components/domains/team/TeamCard';
import { generateSubdomainUrl } from '~/utils/generateSubdomainUrl';

const DashboardTeamPage: ProecoNextPage = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { data: teams } = useTeams({
    userId: currentUser?._id,
  });

  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold>
            チームリスト
          </Typography>
          <Link href={URLS.DASHBOARD_TEAMS_NEW}>
            <Button color="primary" variant="contained" startIcon={<Icon icon="CreateOutlined" width="20px" />}>
              新規チームを作成する
            </Button>
          </Link>
        </Box>
        <StyledTeamList display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap="40px">
          {teams && teams.map((team) => <TeamCard key={team._id} team={team} onClick={() => router.push(generateSubdomainUrl(team.slug, '/dashboard'))} />)}
        </StyledTeamList>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

DashboardTeamPage.getLayout = getLayout;
export default DashboardTeamPage;

const StyledTeamList = styled(Box)`
  /* 最後の行が左寄せになるように記述  */
  &::after {
    content: '';
    display: block;
    width: 300px;
  }
`;
