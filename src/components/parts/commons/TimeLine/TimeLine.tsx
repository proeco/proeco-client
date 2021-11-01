import React, { VFC } from 'react';
import { Timeline } from '@mui/lab';
import { TimeLineItem } from '~/components/parts/commons';

type Props = {
  timeLineItems: { title: string; imagePath: string; children: React.ReactNode }[];
};

export const TimeLine: VFC<Props> = ({ timeLineItems }) => {
  return (
    <Timeline>
      {timeLineItems.map((item, i) => (
        <TimeLineItem key={i} title={item.title} imagePath={item.imagePath}>
          {item.children}
        </TimeLineItem>
      ))}
    </Timeline>
  );
};
