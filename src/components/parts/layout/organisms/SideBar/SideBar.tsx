import { memo, VFC } from 'react';

import { Box } from '@mui/system';
import { Add as AddIcon } from '@mui/icons-material';

export const SideBar: VFC = memo(() => {
  return (
    <Box>
      <AddIcon width="20px" height="20px" />
    </Box>
  );
});
