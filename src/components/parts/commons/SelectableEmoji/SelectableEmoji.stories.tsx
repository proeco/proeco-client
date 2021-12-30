import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SelectableEmoji } from './SelectableEmoji';

export default {
  title: 'parts/commons/SelectableEmoji',
  component: SelectableEmoji,
  argTypes: { onSelectEmoji: { action: 'select' } },
} as ComponentMeta<typeof SelectableEmoji>;

const Template: ComponentStory<typeof SelectableEmoji> = ({ size }) => {
  const [emojiId, setEmojiId] = useState<string>('open_file_folder');
  console.log(emojiId);

  return (
    <div className="p-4">
      <SelectableEmoji size={size} emojiId={emojiId} onSelectEmoji={(emojiId) => setEmojiId(emojiId)} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: 40,
};
