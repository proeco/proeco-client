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
    <div className="row">
      <div className="col-1 d-md-flex flex-column align-items-center d-none pe-2">
        {userAttachmentId ? <UserIcon size={40} isLink attachmentId={userAttachmentId} userId={userId} /> : <GuestUserIcon size={40} />}
        {isConnect && <StyledTimeLineConnector className="bg-primary h-100" />}
      </div>
      <div className="col-12 col-md-11 pb-5">{children}</div>
    </div>
  );
};

const StyledTimeLineConnector = styled.div`
  width: 3px;
`;
