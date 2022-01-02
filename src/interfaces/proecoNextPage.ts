import { NextPage } from 'next';
import { ReactNode } from 'react';
import { GetAccessControl, WithGetAccessControl } from './accessControl';

export type ProecoNextPage<T = {}> = WithGetAccessControl<
  NextPage<T> & { getLayout: (page: ReactNode) => JSX.Element; getAccessControl: GetAccessControl }
>;
