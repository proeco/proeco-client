import { useRouter } from 'next/router';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { ChangeEvent, ReactNode, useState } from 'react';
import { StoryListTable } from '~/components/domains/story/StoryListTable';
import { Button, Pagination, Typography, Icon } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';

import { useStories } from '~/stores/story';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { CreateNewStoryModal } from '~/components/domains/story/CreateNewStoryModal';

const limit = 10;

const StoryList: ProecoNextPage = () => {
  const router = useRouter();
  const teamId = router.query.teamId as string;

  const [isOpenCreateNewStoryModal, setIsOpeCreateNewStoryModal] = useState(false);
  const [page, setPage] = useState(1);
  const { data: stories } = useStories({
    teamId,
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
      <ProecoOgpHead />
      <Box mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold display="flex" alignItems="center" gap="8px">
            <Icon icon="HistoryEdu" width={32} />
            ストーリーリスト
          </Typography>
          <Button variant="contained" bold onClick={handleClickCreateStoryButton} startIcon={<Icon icon="CreateOutlined" width="20px" />}>
            ストーリーを追加する
          </Button>
        </Box>
        <StoryListTable page={page} limit={limit} teamId={teamId} />
        <StyledPagination count={count} page={page} onChange={handleChangePage} />
      </Box>
      <CreateNewStoryModal
        isOpen={isOpenCreateNewStoryModal}
        onCloseModal={() => setIsOpeCreateNewStoryModal(false)}
        teamId={teamId}
        page={page}
      />
    </>
  );
};

const StyledPagination = styled(Pagination)`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
StoryList.getLayout = getLayout;

export default StoryList;
