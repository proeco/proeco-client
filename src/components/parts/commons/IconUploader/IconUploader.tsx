import React, { VFC, ChangeEvent, useState } from 'react';
import { Box, styled } from '@mui/system';
import { Avatar, Typography } from '@mui/material';
import { Crop } from 'react-image-crop';
import { Icon } from '../Icon/Icon';
import { TrimImageModal } from '~/components/parts/commons';

type Props = {
  onSelectImage: (file: ChangeEvent<HTMLInputElement>) => void;
  currentImagePath?: string;
  size?: number;
  crop: Crop;
  onChangeImage: (crop: Crop) => void;
  onCompleteCropImage: (crop: Crop) => void;
  onImageLoaded: (image: HTMLImageElement) => void;
  onTrimImage: () => void;
};

export const IconUploader: VFC<Props> = ({
  onSelectImage,
  currentImagePath,
  size = 100,
  crop,
  onChangeImage,
  onImageLoaded,
  onCompleteCropImage,
  onTrimImage,
}) => {
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSelectImage = (file: ChangeEvent<HTMLInputElement>) => {
    onSelectImage(file);
    setOpen(true);
  };

  const handleTrimImage = () => {
    onTrimImage();
    setOpen(false);
  };

  return (
    <>
      <StyledLabel htmlFor="image">
        {currentImagePath ? (
          <StyledAvatar size={size} src={currentImagePath} />
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
        <StyledInput type="file" name="image" id="image" onChange={handleSelectImage} accept="image/*" />
      </StyledLabel>
      {currentImagePath && (
        <TrimImageModal
          isOpen={open}
          imagePath={currentImagePath}
          onCloseModal={handleCloseModal}
          crop={crop}
          onChangeImage={onChangeImage}
          onCompleteCropImage={onCompleteCropImage}
          onImageLoaded={onImageLoaded}
          onTrimImage={handleTrimImage}
        />
      )}
    </>
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
