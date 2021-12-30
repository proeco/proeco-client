import { VFC, ReactNode } from 'react';
import styled from 'styled-components';
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon';

type Props = {
  userAttachmentId?: string;
  userId: string;
  children: ReactNode;
  isConnect?: boolean;
};

export const TimeLineItem: VFC<Props> = ({ userAttachmentId, userId, children, isConnect = true }) => {
  return (
    <div className="d-flex">
      <div className="d-flex flex-column align-items-center">
        {userAttachmentId ? <UserIcon size={40} isLink attachmentId={userAttachmentId} userId={userId} /> : <GuestUserIcon size={40} />}
        {isConnect && <StyledTimeLineConnector className="bg-primary h-100" />}
      </div>
      <div className="w-100 pb-5 ps-2">{children}</div>
    </div>
  );
};

const StyledTimeLineConnector = styled.div`
  width: 3px;
`;
