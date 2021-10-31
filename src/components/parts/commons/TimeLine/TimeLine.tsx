import React, { VFC, ComponentProps } from 'react';
import { Timeline } from '@mui/lab';

type Props = ComponentProps<typeof Timeline>;

export const TimeLine: VFC<Props> = ({ ...rest }) => {
  return <Timeline {...rest}></Timeline>;
};
