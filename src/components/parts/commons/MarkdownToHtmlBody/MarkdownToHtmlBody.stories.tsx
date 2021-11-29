import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { MarkdownToHtmlBody } from './MarkdownToHtmlBody';
import { SAMPLE_MD } from '~/constants';

export default {
  title: 'parts/commons/MarkdownToHtmlBody',
  component: MarkdownToHtmlBody,
} as ComponentMeta<typeof MarkdownToHtmlBody>;

const Template: ComponentStory<typeof MarkdownToHtmlBody> = ({ ...rest }) => {
  return (
    <Box p="20px" width="600px" bgcolor="#e5e5e5">
      <MarkdownToHtmlBody {...rest} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  content: SAMPLE_MD,
};
