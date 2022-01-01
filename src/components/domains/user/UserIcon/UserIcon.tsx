import { memo, VFC, MouseEvent } from 'react';
import styled from 'styled-components';

import { Icon, Link } from '~/components/parts/commons';
import { useAttachment } from '~/stores/attachment';

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
    <StyledIconWrapper size={size} className="rounded-circle border border-primary border-2 bg-white">
      <Icon icon="PEOPLE" size={size} color="SECONDARY" />
    </StyledIconWrapper>
  );
};

// ローディング状態の UserIcon
export const SkeltonUserIcon: VFC<Pick<Props, 'size'>> = ({ size }) => {
  return <StyledIconWrapper size={size} className="skelton rounded-circle border border-primary border-2" />;
};

// 通常状態の UserIcon
export const UserIcon: VFC<Props> = memo(({ attachmentId, userId, isLink = false, size, onClick }) => {
  const { data: attachment } = useAttachment(attachmentId);

  if (!isLink)
    return <img className="rounded-circle border border-primary border-2 bg-white" width={size} height={size} src={attachment?.filePath} />;

  return (
    <Link href={'/user/' + userId}>
      <img
        className="rounded-circle border border-primary border-2 bg-white d-block"
        width={size}
        height={size}
        alt={userId}
        src={attachment?.filePath}
        onClick={onClick}
      />
    </Link>
  );
});

const StyledIconWrapper = styled.div<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
