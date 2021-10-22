import { VFC } from 'react';
import { Emoji as EmojiOrigin } from 'emoji-mart';
import { Box, styled } from '@mui/system';

type Props = {
  emojiId: string;
  size: number;
};

export const Emoji: VFC<Props> = ({ emojiId, size }) => {
  return (
    <StyledEmojiWrapper>
      <EmojiOrigin emoji={emojiId} size={size} />
    </StyledEmojiWrapper>
  );
};

const StyledEmojiWrapper = styled(Box)`
  .emoji-mart-emoji {
    display: block;
  }
`;
