import React, { VFC } from 'react';
import { Modal as ModalOriginal, ModalHeader } from 'reactstrap';

import { Emoji } from '~/components/parts/commons';

type Size = 'sm' | 'lg' | 'xl';

type Props = {
  open: boolean;
  emojiId?: string;
  title?: string;
  content: JSX.Element;
  onClose: () => void;
  size?: Size;
};

export const Modal: VFC<Props> = ({ open, emojiId, title, content, onClose, size = 'lg' }) => {
  return (
    <ModalOriginal isOpen={open} toggle={onClose} centered zIndex={1400} size={size}>
      {title && (
        <ModalHeader className="text-center" toggle={onClose}>
          <div className="d-flex align-items-center gap-2">
            {emojiId && <Emoji emojiId={emojiId} size={size === 'sm' ? 20 : 24} />}
            {size === 'sm' ? <h4 className="mb-0">{title}</h4> : <h3 className="mb-0">{title}</h3>}
          </div>
        </ModalHeader>
      )}
      <div className="p-4">{content}</div>
    </ModalOriginal>
  );
};
