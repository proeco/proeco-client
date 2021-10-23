import { VFC } from 'react';
import { EmojiData, Emoji as EmojiOrigin } from 'emoji-mart';
import { Box, styled } from '@mui/system';

type Size = 'sm' | 'md' | 'lg';

type Props = {
  emojiId: EmojiData | string;
  size?: Size;
  onClick?: () => void;
};

const sizeMap: { [key in Size]: number } = {
  sm: 24,
  md: 28,
  lg: 32,
};

export const Emoji: VFC<Props> = ({ emojiId, size = 'md', onClick }) => {
  return (
    <StyledEmojiWrapper onClick={onClick}>
      <EmojiOrigin emoji={emojiId} size={sizeMap[size]} />
    </StyledEmojiWrapper>
  );
};

const StyledEmojiWrapper = styled(Box)`
  .emoji-mart-emoji {
    display: block;
  }
`;
