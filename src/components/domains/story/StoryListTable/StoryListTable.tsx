import { VFC } from 'react';

import { Story } from '~/domains';
import { StoryTableRow } from '~/components/domains/story/StoryTableRow';
import { Card } from '~/components/parts/commons';

type Props = {
  stories: Story[];
  productId: string;
};

export const StoryListTable: VFC<Props> = ({ stories, productId }) => {
  return (
    <Card>
      <div className="row">
        <div className="col-2">
          <span className="text-light fs-3 text-nowrap">作成者</span>
        </div>
        <div className="col-7">
          <span className="text-light fs-3 text-nowrap">ストーリー名</span>
        </div>
        <div className="col-3">
          <span className="text-light fs-3 text-nowrap">最終更新日</span>
        </div>
      </div>
      {stories.map((doc) => (
        <StoryTableRow story={doc} key={doc._id} productId={productId} />
      ))}
    </Card>
  );
};
