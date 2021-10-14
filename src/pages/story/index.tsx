import { NextPage } from 'next';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { CreateOutlined as CreateOutlinedIcon } from '@mui/icons-material';

import { StoryListTable } from '~/components/domains/story/organisms/StoryListTable';
import { Button, Pagination, Typography } from '~/components/parts/commons/atoms';
import { ProecoOgpHead } from '~/components/parts/layout/organisms/ProecoOgpHead';
import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';

const StoryList: NextPage = () => {
  const { mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();

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
          <Button variant="contained" bold onClick={handleClickCreateStoryButton} startIcon={<CreateOutlinedIcon />}>
            ストーリーを追加する
          </Button>
        </Box>
        <StoryListTable />
        <StyledPagination count={10} />
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
