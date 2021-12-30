import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Emoji } from './Emoji';

export default {
  title: 'parts/commons/Emoji',
  component: Emoji,
  argTypes: { onClose: { action: 'closed' } },
} as ComponentMeta<typeof Emoji>;

const Template: ComponentStory<typeof Emoji> = (args) => {
  return (
    <div className="p-4 d-flex gap-3">
      <Emoji emojiId={args.emojiId} size={24} />
      <Emoji emojiId={args.emojiId} size={32} />
      <Emoji emojiId={args.emojiId} size={40} />
    </div>
  );
};

export const DirectoryEmoji = Template.bind({});

DirectoryEmoji.args = {
  emojiId: 'open_file_folder',
};
