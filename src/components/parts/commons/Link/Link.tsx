import React, { VFC } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

type Props = {
  href: NextLinkProps['href'];
  target?: string;
  children?: React.ReactNode;
  isShowUnderLine?: boolean;
};

export const Link: VFC<Props> = ({ href, target, children, isShowUnderLine = false }) => (
  <NextLink href={href} passHref>
    <a className={isShowUnderLine ? '' : 'text-decoration-none'} target={target || '_self'} rel={target ? 'opener noreferrer' : ''}>
      {children}
    </a>
  </NextLink>
);
