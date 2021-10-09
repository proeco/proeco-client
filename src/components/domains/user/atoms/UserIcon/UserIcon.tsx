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

export const UserIcon: VFC<Props> = memo(({ imagePath, userId = '', isLink = false, size }) => {
  if (!imagePath) {
    return (
      <StyledBox size={size}>
        <StyledPersonOutlineIcon />
      </StyledBox>
    );
  }

  if (!isLink) return <StyledAvatar size={size} alt="" src={imagePath} />;

  return (
    <Link href={'/user/' + userId}>
      <StyledAvatar size={size} alt="" src={imagePath} />
    </Link>
  );
});

type IconSizes = 'small' | 'midium' | 'large';
const sizeMap: { [key in IconSizes]: number } = {
  small: 40,
  midium: 60,
  large: 80,
};

const StyledBox = styled(Box)<{ size: 'small' | 'midium' | 'large' }>`
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

const StyledAvatar = styled(Avatar)<{ size: 'small' | 'midium' | 'large' }>`
  width: ${(props) => sizeMap[props.size]}px;
  height: ${(props) => sizeMap[props.size]}px;
`;

// const StyledImageBox = styled(StyledBox)`
//   position: relative;
//   overflow: hidden;
// `;

// const StyledImage = styled('img')`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;
