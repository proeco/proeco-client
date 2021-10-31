import React, { VFC, ComponentProps } from 'react';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Typography } from '@mui/material';
import { UserIcon } from '~/components/domains/user/UserIcon';

type TimeLineType = {
  title: string;
  imagePath: string;
};

type Props = ComponentProps<typeof Timeline> & TimeLineType;

export const TimeLine: VFC<Props> = ({ title, imagePath, children, ...rest }) => {
  return (
    <Timeline {...rest}>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <UserIcon size="small" imagePath={imagePath} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h4">{title}</Typography>
          {children}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <UserIcon size="small" imagePath={imagePath} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h4">{title}</Typography>
          {children}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <UserIcon size="small" imagePath={imagePath} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h4">{title}</Typography>
          {children}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};
