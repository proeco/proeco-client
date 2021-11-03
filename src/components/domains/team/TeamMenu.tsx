import React, { MouseEvent, useState, VFC } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { IconButton, Menu, Typography } from '~/components/parts/commons';
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
};

export const Component: VFC<Props> = ({ currentTeam, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center" gap="8px">
        <UserIcon size={40} imagePath={currentTeam?.iconImage} />
        <Typography variant="h3">{currentTeam?.name}</Typography>
      </Box>
      <IconButton width={24} icon="KeyboardArrowDown" onClick={(e) => handleClickMenu(e)} />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} menuItems={menuItems} />
    </Box>
  );
};

export const TeamMenu: VFC = () => {
  const router = useRouter();

  const { data: currentUser } = useCurrentUser();
  const { data: teams } = useTeams({
    userId: currentUser?._id,
  });

  const currentTeam = teams?.filter((team) => team._id === router.query.id)[0];

  const handleClickItem = (id: string) => {
    router.push(`/team/${id}/dashboard`);
  };

  const teamMenuItems = teams
    ? teams.map((team) => {
        return {
          icon: <UserIcon imagePath={team.iconImage} size={24} />,
          text: team.name,
          onClick: () => handleClickItem(team._id),
        };
      })
    : [];

  return <Component currentTeam={currentTeam} menuItems={teamMenuItems} />;
};
