import React, { VFC } from 'react';

import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { Box, styled } from '@mui/system';
import { Button } from '../Button';
import { Modal } from '~/components/parts/commons';

type Props = {
  isOpen: boolean;
  imagePath: string;
  crop: Crop;
  onChangeImage: (crop: Crop) => void;
  onCompleteImage: (crop: Crop) => void;
  onTrimImage: () => void;
  onCloseModal: () => void;
};

export const TrimImageModal: VFC<Props> = ({ isOpen, imagePath, crop, onChangeImage, onCompleteImage, onTrimImage, onCloseModal }) => {
  const content = (
    <Box width="260px" m="0 auto" display="flex" flexDirection="column" alignItems="center" gap="12px">
      <ReactCrop src={imagePath} crop={crop} onChange={onChangeImage} onComplete={onCompleteImage} circularCrop locked />
      <StyledInput
        type="range"
        min={130}
        max={260}
        value={crop.width}
        onChange={(e) =>
          onChangeImage({
            ...crop,
            x: 130 - Number(e.target.value) / 2,
            y: 130 - Number(e.target.value) / 2,
            width: Number(e.target.value),
            height: Number(e.target.value),
          })
        }
      />
      <Button variant="contained" onClick={onTrimImage}>
        決定する
      </Button>
    </Box>
  );

  return <Modal title="画像をトリミングする" content={content} size="small" open={isOpen} emojiId="scissors" onClose={onCloseModal} />;
};

const StyledInput = styled('input')`
  width: 100%;
`;
