import React, { VFC } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Link as MuiLink } from '@mui/material';
import { styled } from '@mui/system';

type Props = {
  href: NextLinkProps['href'];
  target?: string;
  children?: React.ReactNode;
  underline?: 'none' | 'hover' | 'always';
  size?: number;
};

export const Link: VFC<Props> = ({ href, target, children, underline = 'none', size }) => (
  <NextLink href={href} passHref>
    <StyledLink target={target || '_self'} rel="noopener noreferrer" underline={underline} size={size}>
      {children}
    </StyledLink>
  </NextLink>
);

const StyledLink = styled(MuiLink)<{ size: number | undefined }>`
  ${(props) =>
    props.size &&
    `
  font-size: ${props.size}px;
  `}
`;
