import React, { VFC } from 'react';
import { Box, styled } from '@mui/system';

import { Emoji } from '~/components/parts/commons';

type Props = {
  emojiIds: string[];
  onClick: (id: string) => void;
  selectedEmojiId: string;
};

export const EmojiRadioGroup: VFC<Props> = ({ emojiIds, onClick, selectedEmojiId }) => {
  return (
    <Box display="flex" alignItems="center" gap="12px">
      {emojiIds.map((emojiId, i) => (
        <StyledBox key={i} selected={selectedEmojiId === emojiId}>
          <Emoji emojiId={emojiId} size={24} onClick={() => onClick(emojiId)} />
        </StyledBox>
      ))}
    </Box>
  );
};

const StyledBox = styled(Box)<{ selected: boolean }>`
  cursor: pointer;
  padding: 8px;
  filter: ${(props) => (props.selected ? 'grayscale(0%)' : 'grayscale(100%)')};
  -webkit-filter: ${(props) => (props.selected ? 'grayscale(0%)' : 'grayscale(100%)')};
  transform: ${(props) => (props.selected ? 'scale(1.35)' : 'scale(1)')};
  transition: all ease 100ms;
  &:hover {
    filter: grayscale(0%);
    -webkit-filter: grayscale(0%);
    transform: scale(1.35);
  }
`;
