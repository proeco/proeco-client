import React, { VFC, useState, ChangeEvent } from 'react';
import { Box, Grid, styled } from '@mui/material';
import { Button, Icon, Typography, Pagination } from '~/components/parts/commons';
import { StoryListTable } from '~/components/domains/story/StoryListTable';
import { CreateNewStoryModal } from '~/components/domains/story/CreateNewStoryModal';
import { StoryCard, SkeltonStoryCard } from '~/components/domains/story/StoryCard';
import { Team } from '~/domains';
import { useStories } from '~/stores/story';

type Props = {
  page: number;
  limit: 10;
  team: Team;
  count: number;
  editable: boolean;
  onChangePage: (event: ChangeEvent<unknown>, value: number | null) => void;
};

export const StoryTab: VFC<Props> = ({ page, limit, team, count, editable, onChangePage }) => {
  const [isOpenCreateNewStoryModal, setIsOpeCreateNewStoryModal] = useState(false);

  const { data: openStoryList } = useStories({ page, limit, teamId: team._id, isCompleted: false });
  const { data: closeStoryList } = useStories({ page, limit, teamId: team._id, isCompleted: true });

  const handleClickCreateStoryButton = () => {
    setIsOpeCreateNewStoryModal(true);
  };

  return (
    <>
      <Box mb={6} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" bold display="flex" alignItems="center" gap="8px">
          <Icon icon="HistoryEdu" width={32} />
          ストーリーリスト
        </Typography>
        {editable && (
          <Button variant="contained" bold onClick={handleClickCreateStoryButton} startIcon={<Icon icon="CreateOutlined" width="20px" />}>
            ストーリーを追加する
          </Button>
        )}
      </Box>
      <Typography variant="h4" bold align="center" mb={3}>
        進行中のストーリー
      </Typography>
      <Box mb={5}>
        <Grid container maxWidth="900px" mx="auto">
          {openStoryList ? (
            openStoryList.docs.map((story) => {
              return (
                <Grid item key={`top-${story._id}`} xs={12} sm={6} md={4} px={1} pb={2}>
                  <StoryCard story={story} isLink />
                </Grid>
              );
            })
          ) : (
            <>
              <Grid item xs={12} sm={6} md={4} px={1}>
                <SkeltonStoryCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4} px={1}>
                <SkeltonStoryCard />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      <Typography variant="h4" bold align="center" mb={3}>
        完了したストーリー
      </Typography>
      {closeStoryList && (
        <>
          <StoryListTable stories={closeStoryList.docs} productId={team.productId} />
          <StyledPagination count={count} page={page} onChange={onChangePage} />
        </>
      )}
      <CreateNewStoryModal
        isOpen={isOpenCreateNewStoryModal}
        onCloseModal={() => setIsOpeCreateNewStoryModal(false)}
        teamId={team._id}
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
