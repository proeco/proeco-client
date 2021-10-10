import { memo, VFC } from 'react';

import { Box, styled } from '@mui/system';
import { Add as AddIcon } from '@mui/icons-material';
import { Button, Typography } from '~/components/parts/commons/atoms';

type Props = {
  openStoryModal: () => void;
};

export const SideBar: VFC<Props> = memo(({ openStoryModal }) => {
  return (
    <Box width="280px" height="100vh" p="16px" boxSizing="border-box">
      <Box display="flex" width="100%" alignItems="center" justifyContent="space-between">
        <StyledTypography variant="body1">ストーリー</StyledTypography>
        <StyledButton variant="text">
          <StyledAddIcon onClick={openStoryModal} />
        </StyledButton>
      </Box>
    </Box>
  );
});

const StyledTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.textColor.light};
`;

const StyledButton = styled(Button)`
  width: 20px;
  height: 20px;
  min-width: unset;
  padding: 0;
  margin-right: 8px;
`;

const StyledAddIcon = styled(AddIcon)`
  width: 100%;
  height: auto;
  color: ${(props) => props.theme.palette.textColor.light};
`;
