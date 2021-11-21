import React, { VFC } from 'react';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { FirstLetterIcon } from '~/components/parts/commons/FirstLetterIcon';
import { Team } from '~/domains';
import { useSignedUrl } from '~/stores/attachment/useSignedUrl';

type Props = {
  team: Team;
  iconImageUrl?: string;
  size?: number;
};

export const Component: VFC<Props> = ({ team, iconImageUrl, size = 40 }) => {
  if (iconImageUrl) return <UserIcon size={size} imagePath={iconImageUrl} />;
  return <FirstLetterIcon size={size} name={team.name} />;
};

export const TeamIcon: VFC<Props> = ({ team, size = 40 }) => {
  const { data: iconImageUrl } = useSignedUrl(team.iconImageId);

  return <Component team={team} size={size} iconImageUrl={iconImageUrl} />;
};
