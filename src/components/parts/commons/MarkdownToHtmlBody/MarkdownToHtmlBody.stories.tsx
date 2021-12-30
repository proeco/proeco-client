import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MarkdownToHtmlBody } from './MarkdownToHtmlBody';
import { MDS } from '~/constants';

export default {
  title: 'parts/commons/MarkdownToHtmlBody',
  component: MarkdownToHtmlBody,
} as ComponentMeta<typeof MarkdownToHtmlBody>;

const Template: ComponentStory<typeof MarkdownToHtmlBody> = ({ ...rest }) => {
  return (
    <div className="p-3">
      <MarkdownToHtmlBody {...rest} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  content: MDS.SAMPLE_MD,
};
