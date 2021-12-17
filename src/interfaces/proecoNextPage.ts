import { NextPage } from 'next';
import { ReactNode } from 'react';
import { GetAccessControl } from './accessControl';

export type ProecoNextPage<T = {}> = NextPage<T> & { getLayout: (page: ReactNode) => JSX.Element; getAccessControl?: GetAccessControl };
