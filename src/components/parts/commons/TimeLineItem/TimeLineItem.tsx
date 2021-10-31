import React, { VFC, ComponentProps } from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Box, styled } from '@mui/system';
import { SpeedDial, SpeedDialIcon } from '@mui/material';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { Typography } from '~/components/parts/commons';

type TimeLineItemType = {
  title: string;
  imagePath: string;
  children: React.ReactNode;
};

type Props = ComponentProps<typeof TimelineItem> & TimeLineItemType;

export const TimeLineItem: VFC<Props> = ({ title, imagePath, children, ...rest }) => {
  return (
    <StyledDiv>
      <TimelineItem {...rest}>
        <TimelineSeparator>
          <StyledTimeLineDot>
            <UserIcon size="small" imagePath={imagePath} />
          </StyledTimeLineDot>
          <StyledTimeLineConnector />
        </TimelineSeparator>
        <StyledTimeLineContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb="4px">
            <Typography variant="h4" bold>
              {title}
            </Typography>
            <StyledSpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />}></StyledSpeedDial>
          </Box>
          {children}
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
`;

const StyledTimeLineDot = styled(TimelineDot)`
  padding: 0;
  border: none;
`;

const StyledTimeLineConnector = styled(TimelineConnector)`
  background-color: ${(props) => props.theme.palette.primary.main};
`;

const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    width: 20px;
    height: 20px;
    min-height: unset;
    padding: 2px;
  }
  .MuiSpeedDialIcon-root {
    height: 100%;
  }
  .MuiSpeedDialIcon-icon {
    width: 100%;
    height: 100%;
    display: block;
  }
  .MuiSpeedDial-actions {
    margin: 0;
    padding: 0;
  }
`;
