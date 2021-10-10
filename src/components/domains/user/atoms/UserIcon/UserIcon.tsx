import { memo, VFC } from 'react';
import { Avatar, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PersonOutline as PersonOutlineIcon } from '@mui/icons-material';

type IconSizes = 'small' | 'medium' | 'large';
type Props = {
  imagePath?: string;
  userId?: string;
  isLink?: boolean;
  size: IconSizes;
};

export const UserIcon: VFC<Props> = memo(({ imagePath, userId = '', isLink = false, size = 'small' }) => {
  if (!imagePath) {
    return (
      <StyledAvatar size={size}>
        <StyledPersonOutlineIcon />
      </StyledAvatar>
    );
  }

  if (!isLink) return <StyledAvatar size={size} alt={userId} src={imagePath} />;

  return (
    <Link underline="none" href={'/user/' + userId}>
      <StyledAvatar size={size} alt={userId} src={imagePath} />
    </Link>
  );
});

const sizeMap: { [key in IconSizes]: number } = {
  small: 40,
  medium: 60,
  large: 80,
};

const StyledPersonOutlineIcon = styled(PersonOutlineIcon)`
  color: #ccc;
  width: 100%;
  height: auto;
`;

const StyledAvatar = styled(Avatar)<{ size: IconSizes }>`
  background-color: white;
  width: ${(props) => sizeMap[props.size]}px;
  height: ${(props) => sizeMap[props.size]}px;
`;
