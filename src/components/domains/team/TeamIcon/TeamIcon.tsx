import { Avatar } from '@mui/material';
import { styled } from '@mui/system';
import React, { VFC } from 'react';
import { FirstLetterIcon } from '~/components/parts/commons/FirstLetterIcon';

type Props = {
  teamName: string;
  signedUrl?: string;
  size?: number;
};

export const TeamIcon: VFC<Props> = ({ teamName, signedUrl, size = 40 }) => {
  if (signedUrl) return <StyledAvatar size={size} src={signedUrl} />;
  return <FirstLetterIcon size={size} name={teamName} />;
};

const StyledAvatar = styled(Avatar)<{ size: number }>`
  background-color: white;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  box-sizing: border-box;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
