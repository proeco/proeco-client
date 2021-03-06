import { VFC, useState } from 'react';

import { useSuccessNotification } from '~/hooks/useSuccessNotification';

import { Card, Editor } from '~/components/parts/commons';
import { StoryPost, User } from '~/domains';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { restClient } from '~/utils/rest-client';
import { useStoryPosts } from '~/stores/storyPost';

type Props = {
  storyId: string;
  page: number;
  currentUser: User;
};

export const CreateNewStoryPostCard: VFC<Props> = ({ storyId, page, currentUser }) => {
  const { mutate: mutateStoryPosts } = useStoryPosts({
    storyId,
    page,
    limit: 100,
  });

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const [content, setContent] = useState('');

  const handleCompleteEdit = async () => {
    try {
      await restClient.apiPost<StoryPost>('/story-posts', {
        storyPost: { content, storyId },
      });

      mutateStoryPosts();

      setContent('');

      notifySuccessMessage('投稿に成功しました!');
    } catch (error) {
      notifyErrorMessage('投稿に失敗しました!');
    }
  };

  return (
    <Card>
      <Editor content={content} onChangeContent={setContent} onCompleteEdit={handleCompleteEdit} currentUser={currentUser} />
    </Card>
  );
};
