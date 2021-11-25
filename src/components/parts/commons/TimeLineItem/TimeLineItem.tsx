import React, { VFC, ComponentProps } from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { styled } from '@mui/system';
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon';
import { Paper } from '~/components/parts/commons';

type TimeLineItemType = {
  iconImageId?: string;
  userAttachmentId?: string;
  userId: string;
  children: React.ReactNode;
};

type Props = ComponentProps<typeof TimelineItem> & TimeLineItemType;

export const TimeLineItem: VFC<Props> = ({ userAttachmentId, userId, children, ...rest }) => {
  return (
    <StyledDiv>
      <TimelineItem {...rest}>
        <TimelineSeparator>
          <StyledTimeLineDot>
            {userAttachmentId ? <UserIcon size={40} attachmentId={userAttachmentId} userId={userId} /> : <GuestUserIcon size={40} />}
          </StyledTimeLineDot>
          <StyledTimeLineConnector />
        </TimelineSeparator>
        <StyledTimeLineContent>
          <Paper>{children}</Paper>
        </StyledTimeLineContent>
      </TimelineItem>
    </StyledDiv>
  );
};

const StyledDiv = styled('div')`
  .MuiTimelineItem-root {
    margin: 0 auto;
    &::before {
      flex: unset;
      padding: 0;
    }
  }
`;

const StyledTimeLineContent = styled(TimelineContent)`
  padding: 0 0px 40px 8px;
`;

const StyledTimeLineDot = styled(TimelineDot)`
  padding: 0;
  margin: 0;
  border: none;
`;

const StyledTimeLineConnector = styled(TimelineConnector)`
  background-color: ${(props) => props.theme.palette.primary.main};
`;
