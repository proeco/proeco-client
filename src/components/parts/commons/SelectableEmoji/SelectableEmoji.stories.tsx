import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { SelectableEmoji } from './SelectableEmoji';

export default {
  title: 'parts/commons/organisms/SelectableEmoji',
  component: SelectableEmoji,
  argTypes: { onSelectEmoji: { action: 'select' } },
} as ComponentMeta<typeof SelectableEmoji>;

const Template: ComponentStory<typeof SelectableEmoji> = ({ size }) => {
  const [emojiId, setEmojiId] = useState<string>('open_file_folder');
  console.log(emojiId);

  return (
    <Box p={30}>
      <SelectableEmoji size={size} emojiId={emojiId} onSelectEmoji={(emojiId) => setEmojiId(emojiId)} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: 40,
};
