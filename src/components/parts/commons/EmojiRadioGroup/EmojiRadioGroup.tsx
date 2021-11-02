import React, { VFC } from 'react';
import { Box, styled } from '@mui/system';

import { Emoji } from '~/components/parts/commons';

type Props = {
  emojiIds: string[];
  onClick: () => void;
  selectedEmojiId: string;
};

export const EmojiRadioGroup: VFC<Props> = ({ emojiIds, onClick, selectedEmojiId }) => {
  return (
    <Box>
      {emojiIds.map((emojiId) => {
        <StyledBox selected={selectedEmojiId === emojiId}>
          <Emoji emojiId={emojiId} size={24} onClick={onClick} />;
        </StyledBox>;
      })}
    </Box>
  );
};

const StyledBox = styled(Box)<{ selected: boolean }>`
  transform: ${(props) => (props.selected ? 'scale(1.35)' : 'scale(1)')};
`;
