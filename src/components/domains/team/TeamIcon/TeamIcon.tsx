import { Avatar, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import React, { VFC } from 'react';
import { Icon } from '~/components/parts/commons';
import { useAttachment } from '~/stores/attachment';

type Props = {
  attachmentId: string;
  size: number;
};

// ログインしていない状態の TeamIcon
export const GuestTeamIcon: VFC<Pick<Props, 'size'>> = ({ size }) => {
  return (
    <StyledAvatar size={size}>
      <Icon icon="PEOPLE" size={size} />
    </StyledAvatar>
  );
};

// ローディング状態の TeamIcon
export const SkeltonTeamIcon: VFC<Pick<Props, 'size'>> = ({ size }) => {
  return <Skeleton variant="circular" width={size} height={size} />;
};

// 通常状態の TeamIcon
export const TeamIcon: VFC<Props> = ({ attachmentId, size }) => {
  const { data: attachment } = useAttachment(attachmentId);

  return <StyledAvatar size={size} src={attachment?.filePath} />;
};

const StyledAvatar = styled(Avatar)<{ size: number }>`
  background-color: white;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  box-sizing: border-box;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
