import { memo, VFC, ComponentProps } from 'react';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon, Link } from '~/components/parts/commons';

type UserIconType = {
  imagePath?: string;
  userId?: string;
  isLink?: boolean;
  size: number;
};

type Props = ComponentProps<typeof Avatar> & UserIconType;

export const UserIcon: VFC<Props> = memo(({ imagePath, userId = '', isLink = false, size = 40, ...rest }) => {
  if (!imagePath) {
    return (
      <StyledAvatar size={size} {...rest}>
        <Icon icon="PersonOutline" color="#ccc" width="100%" />
      </StyledAvatar>
    );
  }

  if (!isLink) return <StyledAvatar size={size} alt={userId} src={imagePath} {...rest} />;

  return (
    <Link href={'/user/' + userId}>
      <StyledAvatar size={size} alt={userId} src={imagePath} {...rest} />
    </Link>
  );
});

const StyledAvatar = styled(Avatar)<{ size: number }>`
  &.MuiAvatar-root {
    background-color: ${(props) => props.theme.palette.primary.main};
    border: 2px solid ${(props) => props.theme.palette.primary.main};
    background-color: ${(props) => !props.src && 'white'};
    box-sizing: border-box;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  }
`;
