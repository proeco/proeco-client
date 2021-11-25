import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { Editor } from './Editor';

export default {
  title: 'parts/commons/Editor',
  component: Editor,
  argTypes: {
    onPostContent: { action: 'onPostContent' },
    onCancelButton: { action: 'onCancelButton' },
  },
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = ({ content, isUpdateMode, onPostContent, onCancelButton }) => {
  const [markdownContent, setMarkdownContent] = useState(content);

  return (
    <Box p="20px" width="600px" bgcolor="#e5e5e5">
      <Editor
        content={markdownContent}
        onChangeContent={setMarkdownContent}
        isUpdateMode={isUpdateMode}
        onPostContent={onPostContent}
        onCancelButton={onCancelButton}
      />
    </Box>
  );
};

export const DefaultEditor = Template.bind({});
DefaultEditor.args = {
  content: '',
};

export const UpdateEditor = Template.bind({});
UpdateEditor.args = {
  content: 'コンテンツを更新する',
  isUpdateMode: true,
};
