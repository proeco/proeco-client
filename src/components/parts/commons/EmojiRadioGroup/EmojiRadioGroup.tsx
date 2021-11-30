import React, { VFC } from 'react';
import { Box, styled } from '@mui/system';

import { Emoji } from '~/components/parts/commons';

type Props = {
  emojiIds: string[];
  onClick: (id: string) => void;
  selectedEmojiId?: string;
};

export const EmojiRadioGroup: VFC<Props> = ({ emojiIds, onClick, selectedEmojiId }) => {
  return (
    <Box display="flex" alignItems="center" gap="12px" bgcolor="#e5e5e5" width="fit-content" borderRadius="18px" p="0 8px">
      {emojiIds.map((emojiId, i) => {
        if (selectedEmojiId) {
          return (
            <SelectedEmojiBox key={i} selected={selectedEmojiId === emojiId}>
              <Emoji emojiId={emojiId} size={20} onClick={() => onClick(emojiId)} />
            </SelectedEmojiBox>
          );
        }
        return (
          <StyledBox key={i}>
            <Emoji emojiId={emojiId} size={20} onClick={() => onClick(emojiId)} />
          </StyledBox>
        );
      })}
    </Box>
  );
};

const StyledBox = styled(Box)`
  cursor: pointer;
  padding: 8px;
  transition: all ease 100ms;
  &:hover {
    transform: scale(1.3);
  }
`;

const SelectedEmojiBox = styled(StyledBox)<{ selected: boolean }>`
  filter: ${(props) => (props.selected ? 'grayscale(0%)' : 'grayscale(100%)')};
  -webkit-filter: ${(props) => (props.selected ? 'grayscale(0%)' : 'grayscale(100%)')};
  transform: ${(props) => (props.selected ? 'scale(1.35)' : 'scale(1)')};
  &:hover {
    filter: grayscale(0%);
    -webkit-filter: grayscale(0%);
  }
`;
