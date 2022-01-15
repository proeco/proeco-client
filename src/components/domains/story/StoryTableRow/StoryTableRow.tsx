import React, { VFC, useCallback } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Emoji } from '~/components/parts/commons';
import { UserIcon, GuestUserIcon } from '~/components/domains/user/UserIcon';

import { DATE_FORMAT, URLS } from '~/constants';

import { Story } from '~/domains';
import { useUser } from '~/stores/user/useUser';

type Props = {
  story: Story;
  productId: string;
};

export const StoryTableRow: VFC<Props> = ({ story, productId }) => {
  const router = useRouter();

  const { data: createdStoryUser } = useUser({ userId: story.createdUserId });

  const handleClickRow = useCallback(() => {
    router.push(URLS.TEAMS_STORY(productId, story._id));
  }, [router, story._id, productId]);

  return (
    <StyledRow className="row py-3 align-items-center c-pointer" onClick={handleClickRow}>
      <div className="col-2">
        <div className="ps-1">
          {createdStoryUser ? (
            <UserIcon attachmentId={createdStoryUser.iconImageId} size={40} userId={story.createdUserId} isLink />
          ) : (
            <GuestUserIcon size={40} />
          )}
        </div>
      </div>
      <div className="col-7">
        <span className="text-light fs-3 text-nowrap">
          <div className="d-flex align-items-center gap-2">
            <Emoji emojiId={story.emojiId} size={20} />
            <span className="text-truncate">{story.title}</span>
          </div>
        </span>
      </div>
      <div className="col-3 text-truncate">
        <span className="text-light fs-3 text-nowrap ">{format(story.updatedAt, DATE_FORMAT.EXCEPT_SECOND)}</span>
      </div>
    </StyledRow>
  );
};

const StyledRow = styled.div`
  :hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  margin: 0px -16px;
`;
