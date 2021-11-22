import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { IconUploader } from './IconUploader';

export default {
  title: 'parts/commons/IconUploader',
  component: IconUploader,
  argTypes: { onSelectImage: { action: 'onSelectImage' } },
} as ComponentMeta<typeof IconUploader>;

const Template: ComponentStory<typeof IconUploader> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <IconUploader {...rest} />
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
