import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

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
    <div className="p-4">
      <EmojiRadioGroup selectedEmojiId={newSelectedEmojiId} {...rest} onClick={handleClickEmoji} />
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
  selectedEmojiId: undefined,
};

export const ViewableEmojiRadioGroup = Template.bind({});
ViewableEmojiRadioGroup.args = {
  ...Default.args,
  viewable: true,
};
