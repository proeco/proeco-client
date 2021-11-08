import React, { VFC } from 'react';
import { Avatar } from '@mui/material';
import { styled } from '@mui/system';

import { Link } from '~/components/parts/commons/Link';

type Props = {
  name: string;
  size?: number;
  isLink?: boolean;
  linkUrl?: string;
};
export const FirstLetterIcon: VFC<Props> = ({ name, size = 40, isLink = false, linkUrl = '' }) => {
  if (isLink) {
    return (
      <Link href={linkUrl}>
        <StyledAvatar size={size}>{name[0]}</StyledAvatar>
      </Link>
    );
  }
  return <StyledAvatar size={size}>{name[0]}</StyledAvatar>;
};

const StyledAvatar = styled(Avatar)<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  font-size: ${(props) => (props.size / 40) * 1.25}rem;
`;
