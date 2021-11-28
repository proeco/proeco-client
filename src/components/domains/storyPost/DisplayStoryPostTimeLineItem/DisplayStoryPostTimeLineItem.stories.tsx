import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { DisplayStoryPostTimeLineItem } from './DisplayStoryPostTimeLineItem';
import { createMockStoryPost, createMockUser } from '~/mocks/domains';

export default {
  title: 'domains/storyPost/DisplayStoryPostTimeLineItem',
  component: DisplayStoryPostTimeLineItem,
} as ComponentMeta<typeof DisplayStoryPostTimeLineItem>;

const Template: ComponentStory<typeof DisplayStoryPostTimeLineItem> = ({ ...rest }) => {
  return (
    <Box p="20px" width="600px" bgcolor="#e5e5e5">
      <DisplayStoryPostTimeLineItem {...rest} />
    </Box>
  );
};

const mockUser = createMockUser({ name: 'user' });
const mockStoryPost = createMockStoryPost({
  content: `
  # Title

## SubTitle

hoge**hoge**

- foo
- bar
- baz

\`\`\`ts
const hoge = () => console.log('hoge')
hoge()
\`\`\`
`,
});

export const Default = Template.bind({});
Default.args = {
  currentUser: mockUser,
  storyPost: mockStoryPost,
};
