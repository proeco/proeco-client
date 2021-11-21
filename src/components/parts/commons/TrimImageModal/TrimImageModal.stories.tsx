import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Crop } from 'react-image-crop';

import { TrimImageModal } from './TrimImageModal';

export default {
  title: 'parts/commons/TrimImageModal',
  component: TrimImageModal,
  argTypes: {
    onCompleteImage: { action: 'onCompleteImage' },
    onTrimImage: { action: 'onTrimImage' },
    onCloseModal: { action: 'onCloseModal' },
  },
} as ComponentMeta<typeof TrimImageModal>;

const Template: ComponentStory<typeof TrimImageModal> = ({ isOpen, imagePath, onCompleteImage, onTrimImage, onCloseModal }) => {
  const [crop, setCrop] = useState<Crop>({ unit: 'px', x: 65, y: 65, aspect: 1, width: 130, height: 130 });
  return (
    <Box>
      <TrimImageModal
        isOpen={isOpen}
        crop={crop}
        imagePath={imagePath}
        onChangeImage={(newCrop) => setCrop(newCrop)}
        onCompleteImage={onCompleteImage}
        onTrimImage={onTrimImage}
        onCloseModal={onCloseModal}
      />
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
  imagePath: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
};
