import { NextPage } from 'next';

import { Box } from '@mui/system';
import { CreateOutlined as CreateOutlinedIcon } from '@mui/icons-material';

import { Button, Typography } from '~/components/parts/commons/atoms';
import { ProecoOgpHead } from '~/components/parts/layout/organisms/ProecoOgpHead';

const StoryList: NextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <Box p={5}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold>
            ストーリーリスト
          </Typography>
          <Button variant="contained" bold>
            <CreateOutlinedIcon />
            ストーリーを追加する
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default StoryList;
