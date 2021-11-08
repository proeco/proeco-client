import React, { VFC, ComponentProps } from 'react';
import { Avatar } from '@mui/material';
import { styled } from '@mui/system';

type FirstLetterIconType = {
  name: string;
  size?: number;
};

type Props = ComponentProps<typeof Avatar> & FirstLetterIconType;

export const FirstLetterIcon: VFC<Props> = ({ name, size = 40 }) => {
  return <StyledAvatar size={size}>{name[0]}</StyledAvatar>;
};

const StyledAvatar = styled(Avatar)<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  font-size: ${(props) => (props.size / 40) * 1.25}rem;
`;
