import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { Editor } from './Editor';

export default {
  title: 'parts/commons/Editor',
  component: Editor,
  argTypes: {
    onPostContent: { action: 'onPostContent' },
  },
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = ({ ...rest }) => {
  return (
    <Box p="20px" width="600px" bgcolor="#e5e5e5">
      <Editor {...rest} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  content: '',
};
