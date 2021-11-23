import { memo, VFC, MouseEvent } from 'react';
import { Avatar, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon, Link } from '~/components/parts/commons';
import { useAttachmentUrl } from '~/stores/attachment/useAttachmentUrl';

type Props = {
  attachmentId: string;
  userId: string;
  isLink?: boolean;
  size: number;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

// ログインしていない状態の UserIcon
export const GuestUserIcon: VFC<Pick<Props, 'size'>> = ({ size }) => {
  return (
    <StyledAvatar size={size}>
      <Icon icon="PersonOutline" color="#ccc" width="100%" />
    </StyledAvatar>
  );
};

// ローディング状態の UserIcon
export const SkeltonUserIcon: VFC<Pick<Props, 'size'>> = ({ size }) => {
  return <Skeleton variant="circular" width={size} height={size} />;
};

// 通常状態の UserIcon
export const UserIcon: VFC<Props> = memo(({ attachmentId, userId, isLink = false, size, onClick }) => {
  const { data: attachmentUrl } = useAttachmentUrl(attachmentId);

  if (!isLink) return <StyledAvatar size={size} alt={userId} src={attachmentUrl} />;

  return (
    <Link href={'/user/' + userId}>
      <StyledAvatar size={size} alt={userId} src={attachmentUrl} onClick={onClick} />
    </Link>
  );
});

const StyledAvatar = styled(Avatar)<{ size: number }>`
  &.MuiAvatar-root {
    border: 2px solid ${(props) => props.theme.palette.primary.main};
  }
  background-color: white;
  box-sizing: border-box;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
