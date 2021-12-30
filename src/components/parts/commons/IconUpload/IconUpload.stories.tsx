import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IconUpload } from './IconUpload';

export default {
  title: 'parts/commons/IconUpload',
  component: IconUpload,
  argTypes: { onSelectImage: { action: 'onSelectImage' } },
} as ComponentMeta<typeof IconUpload>;

const Template: ComponentStory<typeof IconUpload> = ({ ...rest }) => {
  return (
    <div className="p-3">
      <IconUpload {...rest} />
    </div>
  );
};

export const DefaultIconUpload = Template.bind({});
DefaultIconUpload.args = {
  size: 100,
};

export const IconUploadWithImage = Template.bind({});
IconUploadWithImage.args = {
  ...DefaultIconUpload.args,
  currentImagePath: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
};
