import React, { VFC } from 'react';
import styled from 'styled-components';

import { Emoji } from '~/components/parts/commons';

type Props = {
  emojisInfo: { emojiId: string; count: number }[];
  onClick: (id: string) => void;
  selectedEmojiId?: string;
  viewable?: boolean;
};

export const EmojiRadioGroup: VFC<Props> = ({ emojisInfo, onClick, selectedEmojiId, viewable = false }) => {
  return (
    <div className="d-flex align-items-center gap-3">
      {emojisInfo.map((emojiInfo, i) => {
        if (selectedEmojiId) {
          return (
            <div key={i} className="d-flex align-items-center">
              <SelectedEmojiBox selected={selectedEmojiId === emojiInfo.emojiId}>
                <Emoji emojiId={emojiInfo.emojiId} size={20} onClick={() => onClick(emojiInfo.emojiId)} />
              </SelectedEmojiBox>
              {viewable && <span className="ms-2 fs-2 fw-bold">{emojiInfo.count}</span>}
            </div>
          );
        }
        return (
          <div key={i} className="d-flex align-items-center">
            <StyledBox>
              <Emoji emojiId={emojiInfo.emojiId} size={20} onClick={() => onClick(emojiInfo.emojiId)} />
            </StyledBox>
            {viewable && <span className="ms-2 fs-2 fw-bold">{emojiInfo.count}</span>}
          </div>
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
