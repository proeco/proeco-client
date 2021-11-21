import { memo, VFC, ComponentProps } from 'react';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon, Link } from '~/components/parts/commons';
import { useSignedUrl } from '~/stores/attachment/useSignedUrl';

type UserIconType = {
  iconImageId?: string;
  userId?: string;
  isLink?: boolean;
  size: number;
};

type Props = ComponentProps<typeof Avatar> & UserIconType;

export const UserIcon: VFC<Props> = memo(({ iconImageId, userId = '', isLink = false, size = 40, ...rest }) => {
  const { data: signedUrl } = useSignedUrl(iconImageId);
  if (!signedUrl) {
    return (
      <StyledAvatar size={size} {...rest}>
        <Icon icon="PersonOutline" color="#ccc" width="100%" />
      </StyledAvatar>
    );
  }

  if (!isLink) return <StyledAvatar size={size} alt={userId} src={signedUrl} {...rest} />;

  return (
    <Link href={'/user/' + userId}>
      <StyledAvatar size={size} alt={userId} src={signedUrl} {...rest} />
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
