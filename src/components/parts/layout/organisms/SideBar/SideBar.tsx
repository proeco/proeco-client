import { memo, VFC } from 'react';
import { Box, styled } from '@mui/system';

import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';

import { Typography } from '~/components/parts/commons/atoms';
import { IconButton } from '~/components/parts/commons/organisms/IconButton';

export const SideBar: VFC = memo(() => {
  const { mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();
  const openCreateStoryModal = () => {
    mutateIsOpenCreateNewStoryModal(true);
  };
  return (
    <Box width="280px" height="100vh" p="16px" boxSizing="border-box" bgcolor="#fff">
      <Box display="flex" width="100%" alignItems="center" justifyContent="space-between">
        <StyledTypography variant="body1">ストーリー</StyledTypography>
        <StyledIconButton icon="Add" width={18} aria-label="open" size="small" onClick={openCreateStoryModal} />
      </Box>
    </Box>
  );
});

const StyledTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.textColor.light};
`;

const StyledIconButton = styled(IconButton)`
  color: ${(props) => props.theme.palette.textColor.light};
  margin-right: 8px;
`;
