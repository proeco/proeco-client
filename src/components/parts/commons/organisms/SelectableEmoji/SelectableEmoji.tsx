import React, { VFC, useState, useRef, useEffect } from 'react';

import { Emoji, EmojiData, Picker, emojiIndex } from 'emoji-mart';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import 'emoji-mart/css/emoji-mart.css';

const emojiSize = 40;

type Props = {
  emojiId: string;
  onSelectEmoji: (emojiId: string) => void;
};

export const SelectableEmoji: VFC<Props> = ({ emojiId, onSelectEmoji }) => {
  const [emoji, setEmoji] = useState<EmojiData>();
  const [isEmojiSettingMode, setIsEmojiSettingMode] = useState<boolean>();
  const [pickerTop, setPickerTop] = useState<number>(0);
  const [pickerLeft, setPickerLeft] = useState<number>(0);
  const emojiRef = useRef<HTMLDivElement>(null);

  const handleClickEmoji = () => {
    setIsEmojiSettingMode(true);
    if (emojiRef.current != null) {
      setPickerTop(emojiRef.current.offsetTop + emojiSize + 10);
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
      <StyledBox width="56px" height="56px" p="8px" mr="8px" ref={emojiRef}>
        {emoji && <Emoji emoji={emoji} size={40} onClick={handleClickEmoji} />}
      </StyledBox>
      {isEmojiSettingMode && (
        <>
          <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={10} onClick={() => setIsEmojiSettingMode(false)} />
          <StyledEmojiPickerWrapper top={pickerTop} left={pickerLeft}>
            <Picker onSelect={handleSelectEmoji} title="Proeco" />
          </StyledEmojiPickerWrapper>
        </>
      )}
    </>
  );
};

const StyledBox = styled(Box)`
  cursor: pointer;
  border: ${(props) => props.theme.palette.borderColor.main} 2px solid;
  border-radius: 4px;
  box-sizing: border-box;
  .emoji-mart-emoji {
    cursor: pointer;
  }
`;

const StyledEmojiPickerWrapper = styled(Box)<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;
