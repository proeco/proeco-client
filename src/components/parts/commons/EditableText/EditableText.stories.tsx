import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { EditableText } from './EditableText';

export default {
  title: 'parts/commons/EditableText',
  component: EditableText,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof EditableText>;

const Template: ComponentStory<typeof EditableText> = ({ ...rest }) => {
  return (
    <Box p="20px" bgcolor="#e5e5e5">
      <EditableText {...rest}></EditableText>
    </Box>
  );
};

export const DefaultEditableText = Template.bind({});
DefaultEditableText.args = {
  variant: 'body1',
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
  error: true,
};
