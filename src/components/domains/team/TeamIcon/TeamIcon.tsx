import { Avatar } from '@mui/material';
import { styled } from '@mui/system';
import React, { VFC } from 'react';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { Team } from '~/domains';

type Props = {
  team: Team;
  size?: number;
};

export const TeamIcon: VFC<Props> = ({ team, size = 40 }) => {
  if (team.iconImage) return <UserIcon size={size} imagePath={team.iconImage} />;
  /* TODO Avatarをcomponent化する */
  return <StyledAvatar size={size}>{team.name[0]}</StyledAvatar>;
};

const StyledAvatar = styled(Avatar)<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  font-size: ${(props) => (props.size / 40) * 1.25}rem;
`;
