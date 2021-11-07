import React, { MouseEvent, useMemo, useState, VFC } from 'react';
import { Box, styled } from '@mui/system';
import { useRouter } from 'next/router';
import { Avatar, Skeleton } from '@mui/material';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { IconButton, Menu, Typography, Icon } from '~/components/parts/commons';
import { Team } from '~/domains';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useTeams } from '~/stores/team';
import { URLS } from '~/constants';

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

  const IconContent = useMemo(() => {
    if (isValidating) {
      return (
        <>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width="100px" />
        </>
      );
    }

    if (currentTeam) {
      return (
        <>
          {/* TODO Avatarをcomponent化する */}
          {currentTeam.iconImage ? <UserIcon size={40} imagePath={currentTeam.iconImage} /> : <Avatar>{currentTeam.name[0]}</Avatar>}
          <Typography variant="h3" maximum_lines={1}>
            {currentTeam.name}
          </Typography>
        </>
      );
    }

    return (
      <>
        <Icon width={40} icon="Group" />
        <Typography variant="h3">undefined</Typography>
      </>
    );
  }, [isValidating, currentTeam]);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" position="relative">
      <Box display="flex" alignItems="center" gap="8px">
        {IconContent}
      </Box>
      {!isValidating && <IconButton width={24} icon="KeyboardArrowDown" onClick={(e) => handleClickMenu(e)} />}
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose} menuItems={menuItems} />
    </Box>
  );
};

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    width: 248px;
    text-align: center;
  }
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

  const teamMenuItems = useMemo(() => {
    if (!teams) {
      return [];
    }
    return [
      ...teams
        .filter((team) => team._id !== router.query.id)
        .map((team) => {
          return {
            icon: <UserIcon imagePath={team.iconImage} size={24} />,
            text: team.name,
            onClick: () => handleClickItem(team._id),
          };
        }),
      {
        icon: <Icon icon="CreateOutlined" width={24} />,
        text: '新規チームを作成する',
        onClick: () => router.push(URLS.DASHBOARD_TEAMS_NEW),
      },
    ];
  }, [teams, router.query.id]);

  return <Component currentTeam={currentTeam} menuItems={teamMenuItems} isValidating={isValidatingTeams} />;
};
