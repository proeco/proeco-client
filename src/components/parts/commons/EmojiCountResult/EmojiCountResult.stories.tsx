import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { EmojiCountResult } from './EmojiCountResult';

export default {
  title: 'parts/commons/EmojiCountResult',
  component: EmojiCountResult,
} as ComponentMeta<typeof EmojiCountResult>;

const Template: ComponentStory<typeof EmojiCountResult> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <EmojiCountResult {...rest} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  emojisInfo: [
    { emojiId: 'sob', count: 3 },
    { emojiId: 'confused', count: 10 },
    { emojiId: 'grinning', count: 6 },
    { emojiId: 'star-struck', count: 8 },
  ],
};
