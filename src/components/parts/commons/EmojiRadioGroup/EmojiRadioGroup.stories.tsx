import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { EmojiRadioGroup } from './EmojiRadioGroup';

export default {
  title: 'parts/commons/EmojiRadioGroup',
  component: EmojiRadioGroup,
} as ComponentMeta<typeof EmojiRadioGroup>;

const Template: ComponentStory<typeof EmojiRadioGroup> = ({ selectedEmojiId, ...rest }) => {
  const [newSelectedEmojiId, setNewSelectedEmojiId] = useState(selectedEmojiId);

  const handleClickEmoji = (id: string) => {
    setNewSelectedEmojiId(id);
  };

  return (
    <Box p="20px">
      <EmojiRadioGroup selectedEmojiId={newSelectedEmojiId} {...rest} onClick={handleClickEmoji} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  emojiIds: ['sob', 'confused', 'grinning', 'star-struck'],
  selectedEmojiId: undefined,
};
