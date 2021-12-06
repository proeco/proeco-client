import { ReactNode, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Box, styled } from '@mui/system';

import { GetServerSideProps } from 'next';
import { Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { restClient } from '~/utils/rest-client';
import { Team } from '~/domains';
import { TeamIcon } from '~/components/domains/team/TeamIcon';

const TabTypes = { HOME: 'home', STORY: 'story', SETTINGS: 'settings' };
type TabTypes = typeof TabTypes[keyof typeof TabTypes];

type Props = {
  team: Team;
};

const Dashboard: ProecoNextPage<Props> = ({ team }) => {
  const [value, setValue] = useState<TabTypes>(TabTypes.HOME);

  const handleChange = (_event: React.SyntheticEvent, newValue: TabTypes) => {
    setValue(newValue);
  };

  return (
    <>
      <ProecoOgpHead title={`${team.name}のホーム`} />
      <Box mx="auto">
        <Box mb={2} display="flex" alignItems="center" gap={2}>
          <TeamIcon attachmentId={team.iconImageId} size={80} />
          <Typography variant="h1" maximum_lines={1}>
            {team.name}
          </Typography>
        </Box>
        <TabContext value={value}>
          <StyledTabList onChange={handleChange} aria-label="Editor tabs">
            <StyledTab label="ホーム" value={TabTypes.HOME} />
            <StyledTab label="ストーリー" value={TabTypes.STORY} />
            <StyledTab label="設定" value={TabTypes.SETTINGS} />
          </StyledTabList>
          <TabPanel value={TabTypes.HOME}>HOME</TabPanel>
          <TabPanel value={TabTypes.STORY}>STORY</TabPanel>
          <TabPanel value={TabTypes.SETTINGS}>SETTINGS</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

const StyledTabList = styled(TabList)`
  .MuiTabs-flexContainer {
    gap: 16px;
  }
  min-height: unset;
`;

const StyledTab = styled(Tab)`
  padding: 8px;
  min-height: unset;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { teamId } = context.query;

  try {
    const { data: team } = await restClient.apiGet<Team>(`/teams/${teamId}`);
    console.log(team);

    return { props: { team } };
  } catch (error) {
    return { props: {} };
  }
};

const getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

Dashboard.getLayout = getLayout;
export default Dashboard;
