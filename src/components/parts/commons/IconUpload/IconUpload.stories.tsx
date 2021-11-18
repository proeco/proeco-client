import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { IconUpload } from './IconUpload';

export default {
  title: 'parts/commons/IconUpload',
  component: IconUpload,
  argTypes: { onSelectImage: { action: 'onSelectImage' } },
} as ComponentMeta<typeof IconUpload>;

const Template: ComponentStory<typeof IconUpload> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <IconUpload {...rest} />
    </Box>
  );
};

export const DefaultIconUpload = Template.bind({});
DefaultIconUpload.args = {
  size: 100,
};

export const IconUploadWithImage = Template.bind({});
IconUploadWithImage.args = {
  ...DefaultIconUpload.args,
  currentImage: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
};
