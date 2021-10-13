import React, { FC } from 'react';
import { Modal } from '~/components/parts/commons/organisms/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DeleteModalContents = () => {
  return <>contents</>;
};

export const DeleteStoryModal: FC<Props> = ({ isOpen, onClose }) => {
  return <Modal open={isOpen} title="ストーリーを削除" content={<DeleteModalContents />} onClose={onClose} />;
};
