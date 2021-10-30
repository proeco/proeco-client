import { memo, VFC, ComponentProps } from 'react';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon, Link } from '~/components/parts/commons';

type IconSizes = 'small' | 'medium' | 'large';

type UserIconType = {
  imagePath?: string;
  userId?: string;
  isLink?: boolean;
  size: IconSizes;
};

type Props = ComponentProps<typeof Avatar> & UserIconType;

export const UserIcon: VFC<Props> = memo(({ imagePath, userId = '', isLink = false, size = 'small', ...rest }) => {
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

const sizeMap: { [key in IconSizes]: number } = {
  small: 40,
  medium: 60,
  large: 80,
};

const StyledAvatar = styled(Avatar)<{ size: IconSizes }>`
  background-color: white;
  width: ${(props) => sizeMap[props.size]}px;
  height: ${(props) => sizeMap[props.size]}px;
`;
