import { memo, VFC } from 'react';

import { Box } from '@mui/system';
import { Add as AddIcon } from '@mui/icons-material';

type Props = {
  openStoryModal: () => void;
};

export const SideBar: VFC<Props> = memo(({ openStoryModal }) => {
  return (
    <Box>
      <AddIcon width="20px" height="20px" onClick={openStoryModal} />
    </Box>
  );
});
