import React, { VFC } from 'react';
import { styled } from '@mui/material/styles';
import { Modal as MuiModal } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '../../atoms/Typography';

type Props = {
  open: boolean; // Modal が開いているかどうか
  title: string; // Modal のタイトル
  content: JSX.Element; // Modal の中身
  onCancel: () => void; // close するとき
};

export const Modal: VFC<Props> = ({ open, title, content, onCancel }) => {
  return (
    <StyledMuiModal open={open} onClose={onCancel}>
      <StyledBox>
        <StyledTypography variant="h4">{title}</StyledTypography>
        {content}
      </StyledBox>
    </StyledMuiModal>
  );
};

const StyledMuiModal = styled(MuiModal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  background-color: #fff;
  width: 600px;
  border-radius: 4px;
  padding-top: 8px;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
`;
