import React, { VFC, useState, useRef } from 'react';
import 'emoji-mart/css/emoji-mart.css';

import { Emoji, EmojiData, Picker } from 'emoji-mart';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button, Typography, TextField } from '~/components/parts/commons/atoms';

const openFileFolderEmoji = {
  id: 'open_file_folder',
  name: 'Open File Folder',
  short_names: ['open_file_folder'],
  colons: ':open_file_folder:',
  emoticons: [],
  unified: '1f4c2',
  skin: null,
  native: '📂',
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const title = '✨ ストーリーを作成する';
const emojiSize = 40;

export const CreateNewStoryModal: VFC<Props> = ({ open, onClose }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [emoji, setEmoji] = useState<EmojiData>(openFileFolderEmoji);
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

  const handleChangeStoryTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryTitle(e.target.value);
  };

  const handleChangeStoryDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryDescription(e.target.value);
  };

  const handleClickCreateNewStoryButton = () => {
    // TODO: 後続タスクで処理を実装する
    console.log('TODO');
    onClose();
  };

  const content = (
    <>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          ストーリー名
        </Typography>
        <Box display="flex">
          <StyledBox width="56px" height="56px" p="8px" mr="8px" ref={emojiRef}>
            <Emoji emoji={emoji} size={40} onClick={handleClickEmoji} />
          </StyledBox>
          <TextField fullWidth value={storyTitle} onChange={handleChangeStoryTitle} />
        </Box>
      </Box>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          説明(任意)
        </Typography>
        <TextField fullWidth multiline rows={4} value={storyDescription} onChange={handleChangeStoryDescription} />
      </Box>
      <Box width="100%" textAlign="center">
        <Button variant="contained" onClick={handleClickCreateNewStoryButton}>
          ストーリーを作る！
        </Button>
      </Box>
      {isEmojiSettingMode && (
        <>
          <Box position="fixed" top={0} left={0} right={0} bottom={0} onClick={() => setIsEmojiSettingMode(false)} />
          <StyledEmojiPickerWrapper top={pickerTop} left={pickerLeft}>
            <Picker
              onSelect={(emoji) => {
                setEmoji(emoji);
                setIsEmojiSettingMode(false);
              }}
              title="Proeco"
            />
          </StyledEmojiPickerWrapper>
        </>
      )}
    </>
  );
  return <Modal content={content} title={title} open={open} onClose={onClose} />;
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
