import { memo, VFC } from 'react';
import { Box } from '@mui/system';
import { Avatar, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

type Props = {
  imagePath?: string;
  userId?: string;
  isLink?: boolean;
  size: 'small' | 'midium' | 'large';
};

export const UserIcon: VFC<Props> = memo(({ imagePath, userId = '', isLink = false, size = 'small' }) => {
  if (!imagePath) {
    return (
      <StyledBox size={size}>
        <StyledPersonOutlineIcon />
      </StyledBox>
    );
  }

  if (!isLink) return <StyledAvatar size={size} alt={userId} src={imagePath} />;

  return (
    <Link underline="none" href={'/user/' + userId}>
      <StyledAvatar size={size} alt={userId} src={imagePath} />
    </Link>
  );
});

type IconSizes = 'small' | 'midium' | 'large';
const sizeMap: { [key in IconSizes]: number } = {
  small: 40,
  midium: 60,
  large: 80,
};

const StyledBox = styled(Box)<{ size: IconSizes }>`
  width: ${(props) => sizeMap[props.size]}px;
  height: ${(props) => sizeMap[props.size]}px;
  border-radius: 50%;
  display: block;
  background-color: #fff;
`;

const StyledPersonOutlineIcon = styled(PersonOutlineIcon)`
  color: #ccc;
  width: 100%;
  height: auto;
`;

const StyledAvatar = styled(Avatar)<{ size: IconSizes }>`
  width: ${(props) => sizeMap[props.size]}px;
  height: ${(props) => sizeMap[props.size]}px;
`;
