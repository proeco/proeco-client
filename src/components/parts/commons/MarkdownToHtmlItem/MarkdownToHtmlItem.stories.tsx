import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { MarkdownToHtmlItem } from './MarkdownToHtmlItem';

export default {
  title: 'parts/commons/MarkdownToHtmlItem',
  component: MarkdownToHtmlItem,
} as ComponentMeta<typeof MarkdownToHtmlItem>;

const Template: ComponentStory<typeof MarkdownToHtmlItem> = ({ ...rest }) => {
  return (
    <Box p="20px" width="600px" bgcolor="#e5e5e5">
      <MarkdownToHtmlItem {...rest} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  content: 'MarkdownをHTMLに変換して表示するcomponent',
};
