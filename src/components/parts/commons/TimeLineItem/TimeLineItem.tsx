import React, { VFC } from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { styled } from '@mui/system';
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon';

type Props = {
  userAttachmentId?: string;
  userId: string;
  children: React.ReactNode;
  isConnect?: boolean;
};

export const TimeLineItem: VFC<Props> = ({ userAttachmentId, userId, children, isConnect = true }) => {
  return (
    <StyledDiv>
      <TimelineItem>
        <TimelineSeparator>
          <StyledTimeLineDot>
            {userAttachmentId ? <UserIcon size={40} isLink attachmentId={userAttachmentId} userId={userId} /> : <GuestUserIcon size={40} />}
          </StyledTimeLineDot>
          {isConnect && <StyledTimeLineConnector />}
        </TimelineSeparator>
        <StyledTimeLineContent>{children}</StyledTimeLineContent>
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
  flex: 1;
  min-width: 0;
`;

const StyledTimeLineDot = styled(TimelineDot)`
  padding: 0;
  margin: 0;
  border: none;
  .MuiTypography-root {
    height: fit-content;
  }
`;

const StyledTimeLineConnector = styled(TimelineConnector)`
  background-color: ${(props) => props.theme.palette.primary.main};
`;
