import { memo, VFC } from 'react';
import { Box, styled } from '@mui/system';

import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Typography } from '~/components/parts/commons/atoms';
import { IconButton } from '~/components/parts/commons/organisms/IconButton';
import { UserIcon } from '~/components/domains/user/atoms';

import { User } from '~/domains';

type Props = {
  currentUser?: User;
  openCreateStoryModal: () => void;
};

export const Component: VFC<Props> = memo(({ currentUser, openCreateStoryModal }) => {
  return (
    <Box width="280px" height="100vh" p="16px" boxSizing="border-box" bgcolor="#fff">
      <StyledUserIconWrapper pb="16px">
        <UserIcon size="large" imagePath={currentUser?.image} userId={currentUser?._id} isLink />
        <Typography variant="h3">{currentUser?.name}</Typography>
      </StyledUserIconWrapper>
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

const StyledUserIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;

export const SideBar: VFC = memo(() => {
  const { data: currentUser } = useCurrentUser();

  const { mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();
  const openCreateStoryModal = () => {
    mutateIsOpenCreateNewStoryModal(true);
  };
  return <Component currentUser={currentUser} openCreateStoryModal={openCreateStoryModal} />;
});
