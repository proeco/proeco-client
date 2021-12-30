import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EmojiCountResult } from './EmojiCountResult';

export default {
  title: 'parts/commons/EmojiCountResult',
  component: EmojiCountResult,
} as ComponentMeta<typeof EmojiCountResult>;

const Template: ComponentStory<typeof EmojiCountResult> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <EmojiCountResult {...rest} />
    </div>
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
