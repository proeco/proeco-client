import React, { ComponentProps, VFC } from 'react';
import { Timeline } from '@mui/lab';
import { styled } from '@mui/system';
import { TimeLineItem, Icon } from '~/components/parts/commons';

type Props = {
  timeLineItems: {
    title: string;
    imagePath?: string;
    name?: string;
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
    <StyledTimeline>
      {timeLineItems.map((item, i) => (
        <TimeLineItem key={i} title={item.title} imagePath={item.imagePath} name={item.name} actions={item.actions}>
          {item.children}
        </TimeLineItem>
      ))}
    </StyledTimeline>
  );
};

const StyledTimeline = styled(Timeline)`
  &.MuiTimeline-root {
    padding: 0;
    margin: 0;
  }
`;