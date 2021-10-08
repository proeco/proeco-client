import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextField } from '~/components/parts/commons/atoms/TextField';

export default {
  title: 'parts/commons/atoms/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = ({ multiline, defaultValue, ...rest }) => {
  return <TextField defaultValue={defaultValue} multiline={multiline} {...rest} />;
};

export const Input = Template.bind({});
Input.args = {
  multiline: false,
  defaultValue: 'これは、InputのdefaultValueです',
};

export const Textarea = Template.bind({});
Textarea.args = {
  multiline: true,
  defaultValue: 'これは、TextareaのdefaultValueです',
};
