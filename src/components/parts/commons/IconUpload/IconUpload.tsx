import React, { VFC, ChangeEvent } from 'react';
import { Box, styled } from '@mui/system';
import { Avatar, Typography } from '@mui/material';
import { Icon } from '../Icon/Icon';
import { UserIcon } from '~/components/domains/user/UserIcon';

type Props = {
  onSelectImage: (file: ChangeEvent<HTMLInputElement>) => void;
  currentImage?: string;
  size?: number;
};

export const IconUpload: VFC<Props> = ({ onSelectImage, currentImage, size = 100 }) => {
  return (
    <StyledLabel htmlFor="image">
      {currentImage ? (
        <UserIcon size={size} imagePath={currentImage} />
      ) : (
        <StyledAvatar size={size}>
          <Icon icon="Group" color="#ccc" width="100%" />
        </StyledAvatar>
      )}
      <StyledOverlay>
        <StyledIcon icon="Photo" width="25%" color="white" size={size} />
        <StyledTypography variant="overline" color="white" size={size}>
          写真を変更
        </StyledTypography>
      </StyledOverlay>
      <StyledInput type="file" name="image" id="image" onChange={onSelectImage} accept="image/*" />
    </StyledLabel>
  );
};

const StyledLabel = styled('label')`
  position: relative;
  display: block;
  width: fit-content;
`;

const StyledAvatar = styled(Avatar)<{ size: number }>`
  background-color: white;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  box-sizing: border-box;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const StyledInput = styled('input')`
  display: none;
`;

const StyledOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(92 92 92 / 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const StyledIcon = styled(Icon)<{ size: number }>`
  display: ${(props) => (props.size < 100 ? 'none' : 'block')};
`;

const StyledTypography = styled(Typography)<{ size: number }>`
  display: ${(props) => (props.size < 100 ? 'none' : 'block')};
`;
