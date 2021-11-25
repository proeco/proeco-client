import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { Editor } from './Editor';
import { Paper } from '~/components/parts/commons';

export default {
  title: 'parts/commons/Editor',
  component: Editor,
  argTypes: {
    onCompleteContent: { action: 'onCompleteContent' },
    onCancelButton: { action: 'onCancelButton' },
  },
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = ({ content, isUpdateMode, isDisabled, onCompleteContent, onCancelButton }) => {
  const [markdownContent, setMarkdownContent] = useState(content);

  return (
    <Box p="20px" width="600px" bgcolor="#e5e5e5">
      <Paper>
        <Editor
          content={markdownContent}
          onChangeContent={setMarkdownContent}
          isUpdateMode={isUpdateMode}
          isDisabled={isDisabled}
          onCompleteContent={onCompleteContent}
          onCancelButton={onCancelButton}
        />
      </Paper>
    </Box>
  );
};

export const DefaultEditor = Template.bind({});
DefaultEditor.args = {
  content: 'コンテンツを投稿する',
  isDisabled: false,
};

export const UpdateEditor = Template.bind({});
UpdateEditor.args = {
  content: 'コンテンツを更新する',
  isDisabled: false,
  isUpdateMode: true,
};

export const disabledEditor = Template.bind({});
disabledEditor.args = {
  content: '',
  isDisabled: true,
};
