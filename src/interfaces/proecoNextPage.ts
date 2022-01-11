import { NextPage } from 'next';
import { VFC } from 'react';
import { GetAccessControl, WithGetAccessControl } from './accessControl';

export type ProecoNextPage<T = {}> = WithGetAccessControl<
  NextPage<T> & { getAccessControl: GetAccessControl; generateOgp: <T>(props: T) => VFC<T> }
>;
