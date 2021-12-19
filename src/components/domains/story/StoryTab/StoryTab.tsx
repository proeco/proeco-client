import React, { VFC, useState } from 'react';
import { TabPanel } from '@mui/lab';
import { Box, styled } from '@mui/material';
import { Button, Icon, Typography, Pagination } from '~/components/parts/commons';
import { StoryListTable } from '~/components/domains/story/StoryListTable';
import { CreateNewStoryModal } from '~/components/domains/story/CreateNewStoryModal';
import { Team } from '~/domains';

const TabTypes = { HOME: 'home', STORY: 'story', SETTINGS: 'settings' };
type TabTypes = typeof TabTypes[keyof typeof TabTypes];

type Props = {
  page: number;
  limit: 10;
  team: Team;
  count: number;
  onChangePage: () => void;
};

export const StoryTab: VFC<Props> = ({ page, limit, team, count, onChangePage }) => {
  const [isOpenCreateNewStoryModal, setIsOpeCreateNewStoryModal] = useState(false);

  const handleClickCreateStoryButton = () => {
    setIsOpeCreateNewStoryModal(true);
  };

  return (
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
      <StoryListTable page={page} limit={limit} teamId={team._id} productId={team.productId} />
      <StyledPagination count={count} page={page} onChange={onChangePage} />
      <CreateNewStoryModal
        isOpen={isOpenCreateNewStoryModal}
        onCloseModal={() => setIsOpeCreateNewStoryModal(false)}
        teamId={team._id}
        page={page}
      />
    </TabPanel>
  );
};

const StyledPagination = styled(Pagination)`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
