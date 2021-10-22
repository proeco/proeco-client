import { VFC } from 'react';
import { Emoji as EmojiOrigin } from 'emoji-mart';
import { Box, styled } from '@mui/system';

type Size = 'small' | 'medium' | 'large';

type Props = {
  emojiId: string;
  size: Size;
};

const sizeMap: { [key in Size]: number } = {
  small: 24,
  medium: 40,
  large: 60,
};

export const Emoji: VFC<Props> = ({ emojiId, size = 'medium' }) => {
  return (
    <StyledEmojiWrapper>
      <EmojiOrigin emoji={emojiId} size={sizeMap[size]} />
    </StyledEmojiWrapper>
  );
};

const StyledEmojiWrapper = styled(Box)`
  .emoji-mart-emoji {
    display: block;
  }
`;
