import React, { useMemo, VFC } from 'react';
import { Avatar, Card as MuiCard, Skeleton } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Team } from '~/domains';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { Link, Typography, Icon } from '~/components/parts/commons';

type Props = {
  team?: Team;
  isValidating: boolean;
};

export const TeamCard: VFC<Props> = ({ team, isValidating }) => {
  const IconContent = useMemo(() => {
    if (isValidating) return <Skeleton variant="circular" width={40} height={40} />;

    if (team) {
      if (team.iconImage) return <UserIcon size={40} imagePath={team.iconImage} />;
      //TODO Avatarをcomponent化する
      return <Avatar>{team.name[0]}</Avatar>;
    }

    return <Icon width={40} icon="Group" />;
  }, [isValidating, team]);

  const NameContent = useMemo(() => {
    if (isValidating) return <Skeleton variant="text" width="100px" />;

    if (team) {
      return (
        <Typography variant="h3" noWrap width="220px">
          {team.name}
        </Typography>
      );
    }

    return <Typography variant="h3">undefined</Typography>;
  }, [isValidating, team]);

  const DescriptionContent = useMemo(() => {
    if (isValidating) {
      return (
        <>
          <Skeleton variant="text" width="260px" />
          <Skeleton variant="text" width="260px" />
        </>
      );
    }

    if (team) {
      return <StyledDescription variant="caption">{team.description}</StyledDescription>;
    }

    return <Typography variant="caption">undefined</Typography>;
  }, [isValidating, team]);

  return (
    <StyledBox>
      <Link href={`/teams/${team?._id}`}>
        <StyledTeamCard>
          <Box display="flex" alignItems="center" mb="8px">
            <Box mr="8px">{IconContent}</Box>
            {NameContent}
          </Box>
          {DescriptionContent}
        </StyledTeamCard>
      </Link>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  .MuiLink-root {
    position: relative;
    top: 0;
    display: block;
    width: fit-content;
    transition: all 0.3s;
    &:hover {
      top: -4px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
`;

const StyledTeamCard = styled(MuiCard)`
  width: 300px;
  height: 130px;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledDescription = styled(Typography)`
  line-height: 1.5;
  letter-spacing: 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
