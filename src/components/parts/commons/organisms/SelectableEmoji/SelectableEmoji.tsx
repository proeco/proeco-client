import React, { VFC, useState, useRef, useEffect } from 'react';

import { Emoji, EmojiData, Picker, emojiIndex } from 'emoji-mart';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import 'emoji-mart/css/emoji-mart.css';

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
      <StyledBox height={size} width={size} p="4px" ref={emojiRef} isEmojiSettingMode={isEmojiSettingMode}>
        {/* Paddingとborderの分サイズをひく */}
        {emoji && <Emoji emoji={emoji} size={size - 12} onClick={handleClickEmoji} />}
      </StyledBox>
      {isEmojiSettingMode && (
        <>
          <Box position="fixed" top={0} left={0} right={0} bottom={0} onClick={() => setIsEmojiSettingMode(false)} />
          <StyledEmojiPickerWrapper top={pickerTop} left={pickerLeft} zIndex={1}>
            <Picker onSelect={handleSelectEmoji} title="Proeco" />
          </StyledEmojiPickerWrapper>
        </>
      )}
    </>
  );
};

const StyledBox = styled(Box)<{ isEmojiSettingMode: boolean }>`
  cursor: pointer;
  border: ${(props) => props.theme.palette.borderColor.main} 2px solid;
  border-radius: 4px;
  box-sizing: border-box;
  .emoji-mart-emoji {
    cursor: pointer;
  }
  ${(props) => props.isEmojiSettingMode && `border: ${props.theme.palette.primary.main} 2px solid;`}
`;

const StyledEmojiPickerWrapper = styled(Box)<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;
