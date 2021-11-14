import React, { VFC, ComponentProps } from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Box, styled } from '@mui/system';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { Paper, Typography, SpeedDial, Icon } from '~/components/parts/commons';

type TimeLineItemType = {
  title: string;
  imagePath: string;
  children: React.ReactNode;
  actions: {
    icon: ComponentProps<typeof Icon>['icon'];
    name: string;
    onClick: () => void;
  }[];
};

type Props = ComponentProps<typeof TimelineItem> & TimeLineItemType;

export const TimeLineItem: VFC<Props> = ({ title, imagePath, children, actions, ...rest }) => {
  return (
    <StyledDiv>
      <TimelineItem {...rest}>
        <TimelineSeparator>
          <StyledTimeLineDot>
            <UserIcon size={40} imagePath={imagePath} />
          </StyledTimeLineDot>
          <StyledTimeLineConnector />
        </TimelineSeparator>
        <StyledTimeLineContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="40px">
            <Typography variant="h4" bold>
              {title}
            </Typography>
            <SpeedDial actions={actions} />
          </Box>
          <Paper>{children}</Paper>
        </StyledTimeLineContent>
      </TimelineItem>
    </StyledDiv>
  );
};

const StyledDiv = styled('div')`
  .MuiTimelineItem-root {
    &::before {
      flex: unset;
      padding: 0;
    }
  }
`;

const StyledTimeLineContent = styled(TimelineContent)`
  max-width: fit-content;
  padding: 8px;
  padding-top: 0;
`;

const StyledTimeLineDot = styled(TimelineDot)`
  padding: 0;
  margin: 0;
  border: none;
`;

const StyledTimeLineConnector = styled(TimelineConnector)`
  background-color: ${(props) => props.theme.palette.primary.main};
`;
