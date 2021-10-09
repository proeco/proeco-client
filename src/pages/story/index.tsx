import { NextPage } from 'next';

import { Box } from '@mui/system';
import { CreateOutlined as CreateOutlinedIcon } from '@mui/icons-material';

import { StoryListTable } from '~/components/domains/story/organisms/StoryListTable';
import { Button, Typography } from '~/components/parts/commons/atoms';
import { ProecoOgpHead } from '~/components/parts/layout/organisms/ProecoOgpHead';

const StoryList: NextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold>
            ストーリーリスト
          </Typography>
          <Button variant="contained" bold>
            <CreateOutlinedIcon />
            ストーリーを追加する
          </Button>
        </Box>
        <StoryListTable />
      </Box>
    </>
  );
};

export default StoryList;
