import { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';

import { SkeltonUserIcon } from '~/components/domains/user/UserIcon';
import { Button, Card, Icon, IconUpload } from '~/components/parts/commons';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { URLS } from '~/constants';
import { User } from '~/domains';
import { useUploadAttachment } from '~/hooks/attachments';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { useAttachment } from '~/stores/attachment';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { restClient } from '~/utils/rest-client';

const DashboardSettingsPage: ProecoNextPage = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const [newUser, setNewUser] = useState<Pick<User, 'name' | 'description'>>({
    name: '',
    description: '',
  });
  const { data: attachment } = useAttachment(currentUser?.iconImageId);
  const [isUpdating, setIsUpdating] = useState(false);
  const [iconImage, setIconImage] = useState<File>();
  const [isValidForm, setIsValidForm] = useState(true);

  const { notifyErrorMessage } = useErrorNotification();
  const { notifySuccessMessage } = useSuccessNotification();
  const { uploadAttachment, isLoading: isLoadingUploadAttachment } = useUploadAttachment();

  useEffect(() => {
    if (currentUser) {
      setNewUser({
        name: currentUser.name,
        description: currentUser.description,
      });
    }
  }, [currentUser]);

  const updateUserForm = (newObject: Partial<User>) => {
    setNewUser((prevState) => {
      return {
        ...prevState,
        ...newObject,
      };
    });
  };

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) return;
    if (!e.target.files) {
      return;
    }
    try {
      const attachment = await uploadAttachment(e.target.files[0], `${currentUser._id}/user-icons`);
      updateUserForm({ iconImageId: attachment._id });
      setIconImage(e.target.files[0]);
    } catch (error) {
      if (error instanceof Error) {
        notifyErrorMessage(error.message);
      }
    }
  };

  const handleClickCreateNewTeam = async () => {
    setIsUpdating(true);
    try {
      const { data } = await restClient.apiPut<User>('/users', { newUser });
      notifySuccessMessage('ユーザー情報更新しました');
      mutateCurrentUser(data, false);
      setIsUpdating(false);
    } catch (error) {
      notifyErrorMessage('ユーザー情報の更新に失敗しました');
    }
  };

  useEffect(() => {
    setIsValidForm(newUser.name.trim() !== '');
  }, [newUser]);

  return (
    <DashboardLayout>
      <StyledDiv className="mx-auto">
        <div className="d-flex align-items-center mb-3">
          <h2 className="fw-bold mb-0 d-flex align-items-center gap-2">
            <Icon icon="GEAR" size={28} />
            設定
          </h2>
        </div>
        <Card>
          <div className="d-flex align-items-center justify-content-center">
            {isLoadingUploadAttachment ? (
              <SkeltonUserIcon size={100} />
            ) : (
              <IconUpload
                onSelectImage={handleChangeFile}
                currentImagePath={iconImage ? URL.createObjectURL(iconImage) : attachment?.filePath}
              />
            )}
          </div>
          <div className="mb-3">
            <span className="mb-1 d-inline-block text-light">ユーザー名</span>
            <input className="form-control" value={newUser?.name} onChange={(e) => updateUserForm({ name: e.target.value })} />
          </div>
          <div className="mb-3">
            <span className="mb-1 d-inline-block text-light">自己紹介</span>
            <textarea
              className="form-control"
              rows={6}
              value={newUser?.description}
              onChange={(e) => updateUserForm({ description: e.target.value })}
            />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button disabled={isUpdating || !isValidForm || isLoadingUploadAttachment} color="primary" onClick={handleClickCreateNewTeam}>
              <Icon icon="CLOCKWISE" size={16} color="WHITE" />
              更新する
            </Button>
          </div>
        </Card>
      </StyledDiv>
    </DashboardLayout>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
`;

DashboardSettingsPage.getAccessControl = () => {
  return { destination: URLS.TOP, loginRequired: true };
};
export default DashboardSettingsPage;
