import React, { ComponentProps, VFC } from 'react';
import { Timeline } from '@mui/lab';
import { TimeLineItem, Icon } from '~/components/parts/commons';

type Props = {
  timeLineItems: {
    title: string;
    imagePath: string;
    children: React.ReactNode;
    actions: {
      icon: ComponentProps<typeof Icon>['icon'];
      name: string;
      onClick: () => void;
    }[];
  }[];
};

export const TimeLine: VFC<Props> = ({ timeLineItems }) => {
  return (
    <Timeline>
      {timeLineItems.map((item, i) => (
        <TimeLineItem key={i} title={item.title} imagePath={item.imagePath} actions={item.actions}>
          {item.children}
        </TimeLineItem>
      ))}
    </Timeline>
  );
};
