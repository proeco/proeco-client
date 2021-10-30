import React, { VFC } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Link as MuiLink } from '@mui/material';

type Props = {
  href: NextLinkProps['href'];
  target?: string;
  children?: React.ReactNode;
  underline?: 'none' | 'hover' | 'always';
};

export const Link: VFC<Props> = ({ href, target, children, underline = 'none' }) => (
  <NextLink href={href} passHref>
    <MuiLink target={target || '_self'} rel="noopener noreferrer" underline={underline}>
      {children}
    </MuiLink>
  </NextLink>
);
