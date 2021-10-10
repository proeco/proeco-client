import { memo, VFC } from 'react';

import { Box } from '@mui/system';
import { Add as AddIcon } from '@mui/icons-material';
import { Button } from '~/components/parts/commons/atoms';

type Props = {
  openStoryModal: () => void;
};

export const SideBar: VFC<Props> = memo(({ openStoryModal }) => {
  return (
    <Box>
      <Button variant="text">
        <AddIcon onClick={openStoryModal} />
      </Button>
    </Box>
  );
});
