import React, { VFC, ComponentProps } from 'react';
import { Box } from '@mui/system';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button, Typography } from '~/components/parts/commons/atoms';
import { TextField } from '~/components/parts/commons/atoms/TextField';

type Props = Omit<ComponentProps<typeof Modal>, 'title' | 'content'>;

const title = '✨ ストーリーを作成する';

const content = (
  <>
    <Box mb="16px">
      <Typography mb="4px" variant="body1">
        ストーリー名
      </Typography>
      <TextField fullWidth />
    </Box>
    <Box mb="16px">
      <Typography mb="4px" variant="body1">
        概要(任意)
      </Typography>
      <TextField fullWidth multiline rows={4} />
    </Box>
    <Box width="100%" textAlign="center">
      <Button variant="contained">作る！</Button>
    </Box>
  </>
);

export const CreateNewStoryModal: VFC<Props> = ({ ...rest }) => {
  return <Modal content={content} title={title} {...rest} />;
};
