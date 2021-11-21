import React, { VFC } from 'react';

import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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
    <>
      <ReactCrop src={imagePath} crop={crop} onChange={onChangeImage} onComplete={onCompleteImage} circularCrop />
      <Button onClick={onTrimImage}>決定する</Button>
    </>
  );

  return <Modal title="画像をトリミングする" content={content} size="small" open={isOpen} emojiId="scissors" onClose={onCloseModal} />;
};
