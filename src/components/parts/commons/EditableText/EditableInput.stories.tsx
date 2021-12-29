import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableInput } from './EditableInput';

export default {
  title: 'parts/commons/EditableInput',
  component: EditableInput,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof EditableInput>;

const Template: ComponentStory<typeof EditableInput> = ({ ...rest }) => {
  return (
    <div className="p-3 bg-white">
      <EditableInput {...rest}></EditableInput>
    </div>
  );
};

export const DefaultEditableText = Template.bind({});
DefaultEditableText.args = {
  value: 'EditableText',
};

// export const multilineEditableText = Template.bind({});
// multilineEditableText.args = {
//   ...DefaultEditableText.args,
//   value: 'これは、複数行のEditableTextです',
//   multiline: true,
// };

export const ErrorEditableText = Template.bind({});
ErrorEditableText.args = {
  ...DefaultEditableText.args,
};
