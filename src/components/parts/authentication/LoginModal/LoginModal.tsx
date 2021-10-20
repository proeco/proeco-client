import React, { FC } from 'react';
import { Box, styled } from '@mui/system';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button } from '~/components/parts/commons/atoms/Button';
import { Typography } from '~/components/parts/commons/atoms';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const content = (
    <>
      <Box>test</Box>
    </>
  );

  return <Modal open={isOpen} title="✨ Proecoへようこそ！ ✨" content={content} onClose={onClose} />;
};
