import React, { FC } from 'react';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button } from '~/components/parts/commons/atoms/Button';

type DeleteStoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeleteStory: () => void;
};

type DeleteModalContentsProps = {
  onDeleteStory: () => void;
};

const DeleteModalContents: FC<DeleteModalContentsProps> = ({ onDeleteStory }) => {
  return <Button onClick={onDeleteStory}>削除</Button>;
};

export const DeleteStoryModal: FC<DeleteStoryModalProps> = ({ isOpen, onClose, onDeleteStory }) => {
  return <Modal open={isOpen} title="ストーリーを削除" content={<DeleteModalContents onDeleteStory={onDeleteStory} />} onClose={onClose} />;
};
