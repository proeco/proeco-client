import React, { VFC } from 'react';
import { styled } from '@mui/material/styles';
import { Modal as MuiModal } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '~/components/parts/commons/atoms/Typography';
import { Divider } from '~/components/parts/commons/atoms/Divider';

type Props = {
  open: boolean;
  title: string;
  content: JSX.Element;
  onClose: () => void;
};

export const Modal: VFC<Props> = ({ open, title, content, onClose }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <StyledBox width="600px">
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
