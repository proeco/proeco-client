import React, { VFC, ComponentProps, useState } from 'react';
import { Box } from '@mui/system';

import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button, Typography } from '~/components/parts/commons/atoms';
import { TextField } from '~/components/parts/commons/atoms/TextField';

type Props = Omit<ComponentProps<typeof Modal>, 'title' | 'content'>;

const title = '✨ ストーリーを作成する';

export const CreateNewStoryModal: VFC<Props> = ({ ...rest }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storySummary, setStorySummary] = useState('');

  const handleChangeStoryTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryTitle(e.target.value);
  };

  const handleChangeStorySummary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStorySummary(e.target.value);
  };

  const handleClickCreateNewStoryButton = () => {
    // TODO: 後続タスクで処理を実装する
    console.log('TODO');
  };

  const content = (
    <>
      <Box mb="16px">
        <Typography mb="4px" variant="body1">
          ストーリー名
        </Typography>
        <TextField fullWidth value={storyTitle} onChange={handleChangeStoryTitle} />
      </Box>
      <Box mb="16px">
        <Typography color="textColor.main" mb="4px" variant="body1">
          概要(任意)
        </Typography>
        <TextField fullWidth multiline rows={4} value={storySummary} onChange={handleChangeStorySummary} />
      </Box>
      <Box width="100%" textAlign="center">
        <Button variant="contained" onClick={handleClickCreateNewStoryButton}>
          作る！
        </Button>
      </Box>
    </>
  );
  return <Modal content={content} title={title} {...rest} />;
};
