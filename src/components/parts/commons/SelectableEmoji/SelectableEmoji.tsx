import React, { VFC, useState, useRef, useEffect } from 'react';

import { EmojiData, Picker, emojiIndex } from 'emoji-mart';
import styled from 'styled-components';
import { Emoji } from '~/components/parts/commons/Emoji';

type Props = {
  emojiId: string;
  size: number;
  onSelectEmoji: (emojiId: string) => void;
};

export const SelectableEmoji: VFC<Props> = ({ emojiId, size, onSelectEmoji }) => {
  const [emoji, setEmoji] = useState<EmojiData>();
  const [isEmojiSettingMode, setIsEmojiSettingMode] = useState<boolean>(false);
  const [pickerTop, setPickerTop] = useState<number>(0);
  const [pickerLeft, setPickerLeft] = useState<number>(0);
  const emojiRef = useRef<HTMLDivElement>(null);

  const handleClickEmoji = () => {
    setIsEmojiSettingMode(true);
    if (emojiRef.current != null) {
      setPickerTop(emojiRef.current.offsetTop + size + 10);
      setPickerLeft(emojiRef.current.offsetLeft);
    }
  };

  const handleSelectEmoji = (emoji: EmojiData) => {
    if (emoji.id) {
      onSelectEmoji(emoji.id);
    }
    setIsEmojiSettingMode(false);
  };

  useEffect(() => {
    const result = emojiIndex.search(emojiId);
    if (result != null) {
      setEmoji(result[0]);
    }
  }, [emojiId]);

  return (
    <>
      <StyledBox className="c-pointer p-1 border" ref={emojiRef}>
        {emoji && <Emoji emojiId={emoji} size={28} onClick={handleClickEmoji} />}
      </StyledBox>
      {isEmojiSettingMode && (
        <>
          <div className="position-fixed top-0 start-0 end-0 bottom-0" onClick={() => setIsEmojiSettingMode(false)} />
          <StyledEmojiPickerWrapper top={pickerTop} left={pickerLeft}>
            <Picker onSelect={handleSelectEmoji} title="Proeco" />
          </StyledEmojiPickerWrapper>
        </>
      )}
    </>
  );
};

const StyledBox = styled.div`
  border-radius: 4px;
  box-sizing: border-box;
  .emoji-mart-emoji {
    cursor: pointer;
  }
`;

const StyledEmojiPickerWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;
