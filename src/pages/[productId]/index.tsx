import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useState, useEffect, useMemo } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Box, styled } from '@mui/system';

import { Team } from '~/domains';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { TeamIcon } from '~/components/domains/team/TeamIcon';
import { StoryTab } from '~/components/domains/story/StoryTab';
import { TeamHomeTab } from '~/components/domains/team/TeamHomeTab';

import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useTeamUsers } from '~/stores/team';

import { restClient } from '~/utils/rest-client';
import { extractHash } from '~/utils/extractHash';

import { PaginationResult } from '~/interfaces';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamSettingTab } from '~/components/domains/team/TeamSettingTab';

const TabTypes = { HOME: 'home', STORY: 'story', SETTINGS: 'settings' };
type TabTypes = typeof TabTypes[keyof typeof TabTypes];

type Props = {
  team: Team;
};

const Dashboard: ProecoNextPage<Props> = ({ team }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.HOME);
  const { data: teamUsers = [] } = useTeamUsers({ teamId: team._id });

  const isMemberOfTeam = useMemo(() => {
    return !!currentUser && teamUsers.some((teamUser) => teamUser._id === currentUser._id);
  }, [currentUser, teamUsers]);

  useEffect(() => {
    switch (extractHash(router.asPath)) {
      case TabTypes.HOME: {
        setActiveTab(TabTypes.HOME);
        break;
      }
      case TabTypes.STORY: {
        setActiveTab(TabTypes.STORY);
        break;
      }
      case TabTypes.SETTINGS: {
        setActiveTab(TabTypes.SETTINGS);
        break;
      }
      default: {
        void 0;
      }
    }
  }, [router.asPath]);

  const handleChange = (_event: React.SyntheticEvent, newValue: TabTypes) => {
    router.push(`#${newValue}`);
    setActiveTab(newValue);
  };

  return (
    <>
      <ProecoOgpHead title={`${team.name}のホーム`} />
      <Box mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" gap={2}>
          <TeamIcon attachmentId={team.iconImageId} size={80} />
          <h1 className="mb-0 maximum_lines_1">{team.name}</h1>
        </Box>
        <TabContext value={activeTab}>
          <StyledTabList onChange={handleChange} aria-label="team tabs">
            <StyledTab label={<span className="fw-bold fs-1">ホーム</span>} value={TabTypes.HOME} />
            <StyledTab label={<span className="fw-bold fs-1">ストーリー</span>} value={TabTypes.STORY} />
            {isMemberOfTeam && <StyledTab label={<span className="fw-bold fs-1">設定</span>} value={TabTypes.SETTINGS} />}
          </StyledTabList>
          <TabPanel value={TabTypes.HOME}>
            <TeamHomeTab team={team} currentUser={currentUser} editable={isMemberOfTeam} />
          </TabPanel>
          <TabPanel value={TabTypes.STORY}>
            <StoryTab team={team} editable={isMemberOfTeam} />
          </TabPanel>
          <TabPanel value={TabTypes.SETTINGS}>{currentUser && <TeamSettingTab currentUser={currentUser} team={team} />}</TabPanel>
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
  const { productId } = context.query;

  try {
    const { data: pagination } = await restClient.apiGet<PaginationResult<Team>>(`/teams?productId=${productId}`);
    const team = pagination?.docs[0];

    if (!team) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }

    return { props: { team } };
  } catch (error) {
    return { props: {} };
  }
};

Dashboard.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
Dashboard.getAccessControl = () => {
  return { loginRequired: null };
};
export default Dashboard;
