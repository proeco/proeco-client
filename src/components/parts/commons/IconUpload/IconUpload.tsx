import React, { VFC, ChangeEvent } from 'react';
import { Box, styled } from '@mui/system';
import { Avatar } from '@mui/material';
import { Icon } from '../Icon/Icon';

type Props = {
  onSelectImage: (file: ChangeEvent<HTMLInputElement>) => void;
  currentImagePath?: string;
  size?: number;
};

export const IconUpload: VFC<Props> = ({ onSelectImage, currentImagePath, size = 100 }) => {
  return (
    <StyledLabel htmlFor="image">
      {currentImagePath ? (
        <StyledAvatar size={size} src={currentImagePath} />
      ) : (
        <StyledAvatar size={size}>
          <Icon icon="PEOPLE" color="SECONDARY" size={size} />
        </StyledAvatar>
      )}
      <StyledOverlay className="d-flex gap-2 align-items-center">
        <StyledIcon icon="IMAGE" color="WHITE" size={20} />
        <p className="fs-4 mb-0 text-white">写真を変更</p>
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
