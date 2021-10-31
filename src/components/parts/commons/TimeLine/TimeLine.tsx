import React, { VFC, ComponentProps } from 'react';
import { Timeline } from '@mui/lab';
import { TimeLineItem } from '~/components/parts/commons';

type TimeLineType = {
  timeLineItems: { title: string; imagePath: string; children: React.ReactNode }[];
};

type Props = ComponentProps<typeof Timeline> & TimeLineType;

export const TimeLine: VFC<Props> = ({ timeLineItems, ...rest }) => {
  return (
    <Timeline {...rest}>
      {timeLineItems.map((item, i) => (
        <TimeLineItem key={i} title={item.title} imagePath={item.imagePath}>
          {item.children}
        </TimeLineItem>
      ))}
    </Timeline>
  );
};
