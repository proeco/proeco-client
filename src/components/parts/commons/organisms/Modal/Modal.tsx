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
    <MuiModal open={open} onClose={onCancel}>
      <StyledBox>
        <Typography variant="h4">{title}</Typography>
        {content}
      </StyledBox>
    </MuiModal>
  );
};

const StyledBox = styled(Box)`
  background-color: #fff;
  max-width: 600px;
  border-radius: 4px;
`;
