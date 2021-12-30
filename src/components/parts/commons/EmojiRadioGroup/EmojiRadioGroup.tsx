import React, { VFC } from 'react';
import styled from 'styled-components';

import { Emoji } from '~/components/parts/commons';

type Props = {
  emojiIds: string[];
  onClick: (id: string) => void;
  selectedEmojiId?: string;
};

export const EmojiRadioGroup: VFC<Props> = ({ emojiIds, onClick, selectedEmojiId }) => {
  return (
    <div className="d-flex align-items-center gap-3">
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
    </div>
  );
};

const StyledBox = styled.div`
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
