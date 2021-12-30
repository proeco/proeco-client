import { VFC } from 'react';
import { EmojiData, Emoji as EmojiOrigin } from 'emoji-mart';
import styled from 'styled-components';

type Props = {
  emojiId: EmojiData | string;
  size: number;
  onClick?: () => void;
};

export const Emoji: VFC<Props> = ({ emojiId, size, onClick }) => {
  return (
    <StyledEmojiWrapper onClick={onClick}>
      <EmojiOrigin emoji={emojiId} size={size} />
    </StyledEmojiWrapper>
  );
};

const StyledEmojiWrapper = styled.div`
  .emoji-mart-emoji {
    display: block;
  }
`;
