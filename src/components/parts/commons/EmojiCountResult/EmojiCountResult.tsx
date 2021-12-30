import React, { VFC } from 'react';
import { Emoji } from '~/components/parts/commons';

type Props = {
  emojisInfo: { emojiId: string; count: number }[];
};

export const EmojiCountResult: VFC<Props> = ({ emojisInfo }) => {
  return (
    <div className="d-flex align-items-center gap-4">
      {emojisInfo.map((emojiInfo, i) => (
        <div key={i} className="d-flex align-items-center">
          <Emoji emojiId={emojiInfo.emojiId} size={20} />
          <span className="ms-2 fs-2 fw-bold">{emojiInfo.count}</span>
        </div>
      ))}
    </div>
  );
};
