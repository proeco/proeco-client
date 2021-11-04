import React, { MouseEvent, useState, VFC } from 'react';
import { Box, styled } from '@mui/system';
import { useRouter } from 'next/router';
import { Avatar, Skeleton } from '@mui/material';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { IconButton, Menu, Typography, Button, Icon } from '~/components/parts/commons';
import { Team } from '~/domains';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useTeams } from '~/stores/team';

type Props = {
  currentTeam?: Team;
  menuItems: {
    icon: JSX.Element;
    text: string;
    onClick: () => void;
  }[];
  isValidating: boolean;
};

export const Component: VFC<Props> = ({ currentTeam, menuItems, isValidating }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const IconContent = () => {
    if (isValidating) return <Skeleton variant="circular" width={40} height={40} />;

    if (currentTeam) {
      if (currentTeam.iconImage) return <UserIcon size={40} imagePath={currentTeam.iconImage} />;
      return <Avatar>{currentTeam.name[0]}</Avatar>;
    }

    return <UserIcon size={40} />;
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" position="relative">
      <Box display="flex" alignItems="center" gap="8px">
        {IconContent()}
        <Typography variant="h3">{currentTeam ? currentTeam.name : 'undefined'}</Typography>
      </Box>
      <IconButton width={24} icon="KeyboardArrowDown" onClick={(e) => handleClickMenu(e)} />
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose} menuItems={menuItems}>
        <StyledButton color="primary" variant="contained" startIcon={<Icon icon="CreateOutlined" width="20px" />}>
          新規チームを作成する
        </StyledButton>
      </StyledMenu>
    </Box>
  );
};

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    width: 248px;
    text-align: center;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 8px;
`;

export const TeamMenu: VFC = () => {
  const router = useRouter();

  const { data: currentUser } = useCurrentUser();
  const { data: teams, isValidating: isValidatingTeams } = useTeams({
    userId: currentUser?._id,
  });

  const currentTeam = teams?.find((team) => team._id === router.query.id);

  const handleClickItem = (id: string) => {
    router.push(`/team/${id}/dashboard`);
  };

  const teamMenuItems = teams
    ? teams
        .filter((team) => team._id !== router.query.id)
        .map((team) => {
          return {
            icon: <UserIcon imagePath={team.iconImage} size={24} />,
            text: team.name,
            onClick: () => handleClickItem(team._id),
          };
        })
    : [];

  return <Component currentTeam={currentTeam} menuItems={teamMenuItems} isValidating={isValidatingTeams} />;
};
