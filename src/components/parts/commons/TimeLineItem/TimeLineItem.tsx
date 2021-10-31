import React, { VFC, ComponentProps } from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { styled } from '@mui/system';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { Typography } from '~/components/parts/commons';

type TimeLineItemType = {
  title: string;
  imagePath: string;
};

type Props = ComponentProps<typeof TimelineItem> & TimeLineItemType;

export const TimeLineItem: VFC<Props> = ({ title, imagePath, children, ...rest }) => {
  return (
    <TimelineItem {...rest}>
      <TimelineSeparator>
        <StyledTimeLineDot>
          <UserIcon size="small" imagePath={imagePath} />
        </StyledTimeLineDot>
        <StyledTimeLineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="h4" bold>
          {title}
        </Typography>
        {children}
      </TimelineContent>
    </TimelineItem>
  );
};

const StyledTimeLineDot = styled(TimelineDot)`
  padding: 0;
  border: none;
`;

const StyledTimeLineConnector = styled(TimelineConnector)`
  background-color: ${(props) => props.theme.palette.primary.main};
`;
