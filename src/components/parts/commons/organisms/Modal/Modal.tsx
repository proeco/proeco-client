import React, { VFC } from 'react';
import { styled } from '@mui/material/styles';
import { Modal as MuiModal } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '~/components/parts/commons/atoms/Typography';
import { Divider } from '~/components/parts/commons/atoms/Divider';

type Size = 'small' | 'medium' | 'large';

type Props = {
  open: boolean;
  title: string;
  content: JSX.Element;
  onClose: () => void;
  size?: Size;
};

const sizeMap: { [key in Size]: string } = {
  small: '500px',
  medium: '600px',
  large: '700px',
};

export const Modal: VFC<Props> = ({ open, title, content, onClose, size = 'medium' }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <StyledBox width={sizeMap[size]}>
        <Box py="8px">
          <StyledTypography variant="h4">{title}</StyledTypography>
        </Box>
        <Divider />
        <Box p="20px">{content}</Box>
      </StyledBox>
    </MuiModal>
  );
};

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 4px;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
`;
