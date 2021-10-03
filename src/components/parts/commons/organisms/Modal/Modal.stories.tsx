import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Button, Typography } from '../../atoms';
import { Modal } from './Modal';

export default {
  title: 'parts/commons/organisms/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Content = (
  <Box>
    <Typography>ここにコンテンツが入る</Typography>
  </Box>
);

const Template: ComponentStory<typeof Modal> = () => {
  const [openFlag, setOpenFlag] = useState(false);
  const onCancel = () => {
    setOpenFlag(false);
  };
  return (
    <Box>
      <Button onClick={() => setOpenFlag(true)}>モーダルを開く</Button>
      <Modal title="ここにタイトルが入る" open={openFlag} onCancel={onCancel} content={Content}></Modal>
    </Box>
  );
};

export const Default = Template.bind({});
