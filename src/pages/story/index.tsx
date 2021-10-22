import { NextPage } from 'next';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { ChangeEvent, useState } from 'react';
import { StoryListTable } from '~/components/domains/story/organisms/StoryListTable';
import { Button, Pagination, Typography, Icon } from '~/components/parts/commons/atoms';
import { ProecoOgpHead } from '~/components/parts/layout/organisms/ProecoOgpHead';

import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useStories } from '~/stores/story';

const limit = 10;

const StoryList: NextPage = () => {
  const [page, setPage] = useState(1);
  const { data: currentUser } = useCurrentUser();
  const { data: stories } = useStories({
    userId: currentUser?._id,
    page,
    limit,
  });
  const { mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();

  const count = stories ? stories.totalPages : 1;

  const handleChangePage = (event: ChangeEvent<unknown>, value: number | null) => {
    if (!value) return;
    setPage(value);
  };

  const handleClickCreateStoryButton = () => {
    mutateIsOpenCreateNewStoryModal(true);
  };

  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold>
            ストーリーリスト
          </Typography>
          <Button variant="contained" bold onClick={handleClickCreateStoryButton} startIcon={<Icon icon="CreateOutlined" width="20px" />}>
            ストーリーを追加する
          </Button>
        </Box>
        <StoryListTable page={page} limit={limit} />
        <StyledPagination count={count} page={page} onChange={handleChangePage} />
      </Box>
    </>
  );
};

const StyledPagination = styled(Pagination)`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StoryList;
