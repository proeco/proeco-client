import { NextPage } from 'next';
import { GetAccessControl, WithGetAccessControl } from './accessControl';

export type ProecoNextPage<T = {}> = WithGetAccessControl<NextPage<T> & { getAccessControl: GetAccessControl }>;
