import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { EmojiRadioGroup } from './EmojiRadioGroup';

export default {
  title: 'parts/commons/EmojiRadioGroup',
  component: EmojiRadioGroup,
  argTypes: { onClick: { action: 'click' } },
} as ComponentMeta<typeof EmojiRadioGroup>;

const Template: ComponentStory<typeof EmojiRadioGroup> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <EmojiRadioGroup {...rest} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  emojiIds: ['sob', 'confused', 'grinning', 'star-struck'],
  selectedEmojiId: 'sob',
};
