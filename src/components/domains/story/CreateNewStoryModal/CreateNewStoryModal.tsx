import React, { VFC, useState, useEffect } from 'react';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';
import { Modal, SelectableEmoji, Button } from '~/components/parts/commons';
import { useStories } from '~/stores/story';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

type Props = {
  isOpen: boolean;
  onCloseModal: () => void;
  teamId: string;
  page: number;
};

const limit = 100;

export const CreateNewStoryModal: VFC<Props> = ({ isOpen, onCloseModal, teamId, page }) => {
  const { mutate: mutateOpenTeamStories } = useStories({ page, limit, teamId, isCompleted: false });

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const [isDisabled, setIsDisabled] = useState(true);
  const [newStory, setNewStory] = useState<Pick<Story, 'emojiId' | 'title' | 'description' | 'teamId'>>({
    emojiId: 'open_file_folder',
    title: '',
    teamId,
    description: '',
  });

  useEffect(() => {
    setIsDisabled(newStory.title.length === 0);
  }, [newStory]);

  const handleClickCreateNewStoryButton = async () => {
    try {
      await restClient.apiPost<Story>('/stories', {
        story: newStory,
        teamId,
      });

      mutateOpenTeamStories();

      notifySuccessMessage('ストーリーの作成に成功しました!');

      // stateの初期化
      setNewStory({
        emojiId: 'open_file_folder',
        title: '',
        teamId,
      });

      onCloseModal();
    } catch (error) {
      notifyErrorMessage('ストーリーの作成に失敗しました!');
    }
  };

  const updateStoryForm = (newObject: Partial<Story>) => {
    setNewStory((prevState) => {
      return {
        ...prevState,
        ...newObject,
      };
    });
  };

  const content = (
    <>
      <div className="mb-3">
        <p className="mb-1 text-light">ストーリー名</p>
        <div className="d-flex align-items-center">
          <SelectableEmoji emojiId={newStory.emojiId} size={40} onSelectEmoji={(emojiId) => updateStoryForm({ emojiId })} />
          <input className="ms-2 form-control" value={newStory.title} onChange={(e) => updateStoryForm({ title: e.target.value })} />
        </div>
        <textarea
          className="form-control my-3"
          value={newStory.description}
          onChange={(e) => updateStoryForm({ description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="text-center">
        <Button onClick={handleClickCreateNewStoryButton} disabled={isDisabled} color="primary">
          ストーリーを作る！
        </Button>
      </div>
    </>
  );

  return <Modal content={content} emojiId="sparkles" title="ストーリーを作成する" open={isOpen} onClose={onCloseModal} />;
};
