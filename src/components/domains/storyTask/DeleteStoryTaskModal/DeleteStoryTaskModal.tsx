import React, { VFC } from 'react';
import { Modal } from '~/components/parts/commons';

type Props = {};

export const DeleteStoryTaskModal: VFC<Props> = ({ ...rest }) => {
  return <Modal {...rest} />;
};
