import { VFC } from 'react';
import { EmojiData, Emoji as EmojiOrigin } from 'emoji-mart';
import { Box, styled } from '@mui/system';

type Size = 'small' | 'medium' | 'large';

type Props = {
  emojiId: EmojiData | string;
  size: Size;
  onClick?: () => void;
};

const sizeMap: { [key in Size]: number } = {
  small: 28,
  medium: 40,
  large: 60,
};

export const Emoji: VFC<Props> = ({ emojiId, size = 'medium', onClick }) => {
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
