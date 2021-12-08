import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useState, useEffect, ChangeEvent } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Box, styled } from '@mui/system';

import { Button, Icon, Pagination, Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { restClient } from '~/utils/rest-client';
import { Team } from '~/domains';
import { TeamIcon } from '~/components/domains/team/TeamIcon';
import { CreateNewStoryModal } from '~/components/domains/story/CreateNewStoryModal';
import { useStories } from '~/stores/story';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { StoryListTable } from '~/components/domains/story/StoryListTable';
import { extractHash } from '~/utils/extractHash/extractHash';
import { TeamForm } from '~/components/domains/team/TeamForm';

const TabTypes = { HOME: 'home', STORY: 'story', SETTINGS: 'settings' };
type TabTypes = typeof TabTypes[keyof typeof TabTypes];

type Props = {
  team: Team;
};
const limit = 10;

const Dashboard: ProecoNextPage<Props> = ({ team }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.HOME);

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

  const [isOpenCreateNewStoryModal, setIsOpeCreateNewStoryModal] = useState(false);
  const [page, setPage] = useState(1);
  const { data: stories } = useStories({
    teamId: team?._id,
    page,
    limit,
  });

  const count = stories ? stories.totalPages : 1;

  const handleChangePage = (event: ChangeEvent<unknown>, value: number | null) => {
    if (!value) return;
    setPage(value);
    router.push(`/story?page=${value}`);
  };

  const handleClickCreateStoryButton = () => {
    setIsOpeCreateNewStoryModal(true);
  };

  return (
    <>
      <ProecoOgpHead title={`${team.name}のホーム`} />
      <Box mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" gap={2}>
          <TeamIcon attachmentId={team.iconImageId} size={80} />
          <Typography variant="h1" maximum_lines={1}>
            {team.name}
          </Typography>
        </Box>
        <TabContext value={activeTab}>
          <StyledTabList onChange={handleChange} aria-label="team tabs">
            <StyledTab label={<Typography bold>ホーム</Typography>} value={TabTypes.HOME} />
            <StyledTab label={<Typography bold>ストーリー</Typography>} value={TabTypes.STORY} />
            <StyledTab label={<Typography bold>設定</Typography>} value={TabTypes.SETTINGS} />
          </StyledTabList>
          <TabPanel value={TabTypes.HOME}>HOME</TabPanel>
          <TabPanel value={TabTypes.STORY}>
            <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h3" bold display="flex" alignItems="center" gap="8px">
                <Icon icon="HistoryEdu" width={32} />
                ストーリーリスト
              </Typography>
              <Button variant="contained" bold onClick={handleClickCreateStoryButton} startIcon={<Icon icon="CreateOutlined" width="20px" />}>
                ストーリーを追加する
              </Button>
            </Box>
            <StoryListTable page={page} limit={limit} teamId={team._id} />
            <StyledPagination count={count} page={page} onChange={handleChangePage} />
            <CreateNewStoryModal
              isOpen={isOpenCreateNewStoryModal}
              onCloseModal={() => setIsOpeCreateNewStoryModal(false)}
              teamId={team._id}
              page={page}
            />
          </TabPanel>
          <TabPanel value={TabTypes.SETTINGS}>{currentUser && <TeamForm currentUser={currentUser} team={team} />}</TabPanel>
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

const StyledPagination = styled(Pagination)`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { teamId } = context.query;

  try {
    const { data: team } = await restClient.apiGet<Team>(`/teams/${teamId}`);
    return { props: { team } };
  } catch (error) {
    return { props: {} };
  }
};

const getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

Dashboard.getLayout = getLayout;
export default Dashboard;
