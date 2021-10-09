import { memo, VFC } from 'react';
import { Box } from '@mui/system';
import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

type Props = {
  imagePath?: string;
  userId?: string;
  isLink?: boolean;
  size: 'small' | 'midium' | 'large';
};

export const UserIcon: VFC<Props> = memo(({ imagePath, userId = '', isLink = false, size }) => {
  return (
    <>
      {imagePath ? (
        isLink ? (
          <Link href={'/user/' + userId}>
            <StyledImageBox size={size}>
              <StyledImage src={imagePath} />
            </StyledImageBox>
          </Link>
        ) : (
          <StyledImageBox size={size}>
            <StyledImage src={imagePath} />
          </StyledImageBox>
        )
      ) : (
        <StyledIconBox size={size}>
          <StyledPersonOutlineIcon />
        </StyledIconBox>
      )}
    </>
  );
});

const StyledBox = styled(Box)<{ size: 'small' | 'midium' | 'large' }>`
  width: ${(props) => (props.size === 'small' ? '40px' : props.size === 'midium' ? '60px' : '80px')};
  height: ${(props) => (props.size === 'small' ? '40px' : props.size === 'midium' ? '60px' : '80px')};
  border-radius: 50%;
`;

const StyledIconBox = styled(StyledBox)`
  display: block;
  background-color: #fff;
`;

const StyledImageBox = styled(StyledBox)`
  position: relative;
  overflow: hidden;
`;

const StyledPersonOutlineIcon = styled(PersonOutlineIcon)`
  color: #ccc;
  width: 100%;
  height: auto;
`;

const StyledImage = styled('img')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
