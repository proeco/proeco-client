import React, { VFC } from 'react';
import styled from 'styled-components';

import { Icon } from '~/components/parts/commons';
import { useAttachment } from '~/stores/attachment';

type Props = {
  attachmentId: string;
  size: number;
};

// ログインしていない状態の TeamIcon
export const GuestTeamIcon: VFC<Pick<Props, 'size'>> = ({ size }) => {
  return (
    <StyledIconWrapper size={size} className="rounded-circle border border-primary border-2 bg-white overflow-hidden">
      <Icon icon="PEOPLE" size={size} color="SECONDARY" />
    </StyledIconWrapper>
  );
};

// ローディング状態の TeamIcon
export const SkeltonTeamIcon: VFC<Pick<Props, 'size'>> = ({ size }) => {
  return <StyledIconWrapper size={size} className="skelton rounded-circle border border-primary border-2" />;
};

// 通常状態の TeamIcon
export const TeamIcon: VFC<Props> = ({ attachmentId, size }) => {
  const { data: attachment } = useAttachment(attachmentId);

  return (
    <img
      className="rounded-circle border border-primary border-2 bg-white d-block"
      width={size}
      height={size}
      alt={attachmentId}
      src={attachment?.filePath}
    />
  );
};

const StyledIconWrapper = styled.div<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
