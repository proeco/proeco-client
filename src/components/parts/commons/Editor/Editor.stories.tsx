import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Editor } from './Editor';
import { Card } from '~/components/parts/commons';
import { MDS } from '~/constants';
import { createMockUser } from '~/mocks/domains';

export default {
  title: 'parts/commons/Editor',
  component: Editor,
  argTypes: {
    onCompleteEdit: { action: 'onCompleteEdit' },
    onClickCancelButton: { action: 'onClickCancelButton' },
  },
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = ({ content, isUpdateMode, onCompleteEdit, onClickCancelButton, currentUser }) => {
  const [markdownContent, setMarkdownContent] = useState(content);

  return (
    <div className="p-3">
      <Card>
        <Editor
          content={markdownContent}
          onChangeContent={setMarkdownContent}
          isUpdateMode={isUpdateMode}
          onCompleteEdit={onCompleteEdit}
          onClickCancelButton={onClickCancelButton}
          currentUser={currentUser}
        />
      </Card>
    </div>
  );
};

const mockUser = createMockUser();

export const DefaultEditor = Template.bind({});
DefaultEditor.args = {
  content: MDS.SAMPLE_MD,
  currentUser: mockUser,
};

export const UpdateEditor = Template.bind({});
UpdateEditor.args = {
  content: MDS.SAMPLE_MD,
  isUpdateMode: true,
  currentUser: mockUser,
};

export const disabledEditor = Template.bind({});
disabledEditor.args = {
  content: '',
  currentUser: mockUser,
};
