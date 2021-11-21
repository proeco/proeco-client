import { Avatar } from '@mui/material';
import { styled } from '@mui/system';
import React, { VFC } from 'react';
import { FirstLetterIcon } from '~/components/parts/commons/FirstLetterIcon';
import { Team } from '~/domains';
import { useSignedUrl } from '~/stores/attachment/useSignedUrl';

type Props = {
  team: Team;
  iconImageUrl?: string;
  size?: number;
};

export const Component: VFC<Props> = ({ team, iconImageUrl, size = 40 }) => {
  if (iconImageUrl) return <StyledAvatar size={size} src={iconImageUrl} />;
  return <FirstLetterIcon size={size} name={team.name} />;
};

export const TeamIcon: VFC<Props> = ({ team, size = 40 }) => {
  const { data: iconImageUrl } = useSignedUrl(team.iconImageId);

  return <Component team={team} size={size} iconImageUrl={iconImageUrl} />;
};

const StyledAvatar = styled(Avatar)<{ size: number }>`
  background-color: white;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  box-sizing: border-box;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
