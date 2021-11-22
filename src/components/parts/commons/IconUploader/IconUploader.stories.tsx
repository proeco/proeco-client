import React, { useState, ChangeEvent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { Crop } from 'react-image-crop';
import { IconUploader } from './IconUploader';

export default {
  title: 'parts/commons/IconUploader',
  component: IconUploader,
  argTypes: {
    onCompleteCropImage: { action: 'onCompleteCropImage' },
    onImageLoaded: { action: 'onImageLoaded' },
    onTrimImage: { action: 'onTrimImage' },
  },
} as ComponentMeta<typeof IconUploader>;

const Template: ComponentStory<typeof IconUploader> = ({ size, currentImagePath, onCompleteCropImage, onImageLoaded, onTrimImage }) => {
  const [crop, setCrop] = useState<Crop>({ unit: 'px', x: 65, y: 65, aspect: 1, width: 130, height: 130 });
  const [imagePath, setImagePath] = useState(currentImagePath);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setImagePath(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Box p="20px">
      <IconUploader
        crop={crop}
        onChangeImage={(newCrop) => setCrop(newCrop)}
        size={size}
        currentImagePath={imagePath}
        onSelectImage={handleChangeFile}
        onCompleteCropImage={onCompleteCropImage}
        onImageLoaded={onImageLoaded}
        onTrimImage={onTrimImage}
      />
    </Box>
  );
};

export const DefaultIconUploader = Template.bind({});
DefaultIconUploader.args = {
  size: 100,
};

export const IconUploaderWithImage = Template.bind({});
IconUploaderWithImage.args = {
  ...DefaultIconUploader.args,
  currentImagePath: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
};
