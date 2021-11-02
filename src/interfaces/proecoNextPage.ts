import { NextPage } from 'next';
import { ReactNode } from 'react';

export type ProecoNextPage<T = {}> = NextPage<T> & { getLayout: (page: ReactNode) => JSX.Element };
