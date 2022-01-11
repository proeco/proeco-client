import { NextPage } from 'next';
import { GetAccessControl, WithGetAccessControl } from './accessControl';

export type ProecoNextPage<T = {}> = WithGetAccessControl<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  NextPage<T> & { getAccessControl: GetAccessControl; generateOgp?: (props: any) => JSX.Element }
>;
