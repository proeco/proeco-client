import React, { MouseEvent, useMemo, useState, VFC } from 'react';
import { Box, styled } from '@mui/system';
import { useRouter } from 'next/router';
import { Skeleton } from '@mui/material';
import { TeamIcon } from '~/components/domains/team/TeamIcon';
import { IconButton, Menu, Typography, Icon } from '~/components/parts/commons';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useTeams } from '~/stores/team';
import { URLS } from '~/constants';
import { useSignedUrl } from '~/stores/attachment/useSignedUrl';

type Props = {
  currentTeamInfo?: {
    name: string;
    signedUrl?: string;
  };
  menuItems: {
    icon: JSX.Element;
    text: string;
    onClick: () => void;
  }[];
  isValidating: boolean;
};

export const Component: VFC<Props> = ({ currentTeamInfo, menuItems, isValidating }) => {
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

    if (currentTeamInfo) {
      return (
        <>
          <TeamIcon teamName={currentTeamInfo.name} signedUrl={currentTeamInfo.signedUrl} />
          <Typography variant="h3" maximum_lines={1}>
            {currentTeamInfo.name}
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
  }, [isValidating, currentTeamInfo]);

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
  const { data: signedUrl } = useSignedUrl(currentTeam?.iconImageId);
  const currentTeamInfo = currentTeam ? { name: currentTeam.name, signedUrl } : undefined;

  const teamMenuItems = useMemo(() => {
    if (!teams) {
      return [];
    }
    return [
      ...teams
        .filter((team) => team._id !== router.query.id)
        .map((team) => {
          return {
            icon: <TeamIcon teamName={team.name} signedUrl={signedUrl} size={24} />,
            text: team.name,
            onClick: () => router.push(`/team/${team._id}/dashboard`),
          };
        }),
      {
        icon: <Icon icon="CreateOutlined" width={24} />,
        text: '新規チームを作成する',
        onClick: () => router.push(URLS.DASHBOARD_TEAMS_NEW),
      },
    ];
  }, [teams, router, signedUrl]);

  return <Component menuItems={teamMenuItems} isValidating={isValidatingTeams} currentTeamInfo={currentTeamInfo} />;
};
