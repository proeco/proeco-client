import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Emoji } from './Emoji';

export default {
  title: 'parts/commons/atoms/Emoji',
  component: Emoji,
  argTypes: { onClose: { action: 'closed' } },
} as ComponentMeta<typeof Emoji>;

const Template: ComponentStory<typeof Emoji> = (args) => {
  return (
    <Box p="32px" display="flex" gap="16px">
      <Emoji emojiId={args.emojiId} size={24} />
      <Emoji emojiId={args.emojiId} size={32} />
      <Emoji emojiId={args.emojiId} size={40} />
    </Box>
  );
};

export const DirectoryEmoji = Template.bind({});

DirectoryEmoji.args = {
  emojiId: 'open_file_folder',
};
