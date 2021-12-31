import React, { VFC, useState, ChangeEvent, useRef } from 'react';
import styled from 'styled-components';

import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Spinner } from '../Spinner';
import { Button, MarkdownToHtmlBody, Icon } from '~/components/parts/commons';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { restClient } from '~/utils/rest-client';
import { Attachment, User } from '~/domains';

type Props = {
  content: string;
  isUpdateMode?: boolean;
  onChangeContent: (content: string) => void;
  onCompleteEdit: () => void;
  onClickCancelButton?: () => void;
  currentUser: User;
};

export const Editor: VFC<Props> = ({ content, isUpdateMode = false, onChangeContent, onCompleteEdit, onClickCancelButton, currentUser }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<'editor' | 'preview'>('editor');
  const [isUploading, setIsUploading] = useState(false);

  const { notifyErrorMessage } = useErrorNotification();

  const handleChange = (newValue: 'editor' | 'preview') => {
    setValue(newValue);
  };

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !inputRef.current) {
      return;
    }
    setIsUploading(true);
    const file = e.target.files[0];
    const params = new FormData();
    params.append('file', file);
    try {
      const { data: attachment } = await restClient.apiPost<Attachment>(`/attachments?path=${currentUser._id}/stories`, params, {
        'Content-Type': 'multipart/form-data',
      });
      const selectionStart = inputRef.current.selectionStart;
      const before = content.substring(0, selectionStart);
      const after = content.substring(selectionStart, content.length);

      onChangeContent(`${before}![](${attachment.filePath})${after}`);
      e.target.value = '';
    } catch (error) {
      notifyErrorMessage('画像のアップロードに失敗しました!');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Nav tabs>
        <NavItem active={value === 'editor'}>
          <NavLink className={value === 'editor' ? 'active' : ''} onClick={() => handleChange('editor')}>
            Editor
          </NavLink>
        </NavItem>
        <NavItem active={value === 'preview'}>
          <NavLink className={value === 'preview' ? 'active' : ''} onClick={() => handleChange('preview')}>
            Preview
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={value}>
        <TabPane tabId="editor">
          <textarea
            className="form-control my-3"
            ref={inputRef}
            value={content}
            onChange={(e) => onChangeContent(e.target.value)}
            rows={(content.match(/\n/g) || []).length + 10}
          />
        </TabPane>
        <TabPane tabId="preview">
          {content === '' ? (
            <StyledParagraphWrapper className="text-center d-flex flex-column align-items-center justify-content-center">
              本文がありません
            </StyledParagraphWrapper>
          ) : (
            <StyledDiv className="py-4">
              <MarkdownToHtmlBody content={content} />
            </StyledDiv>
          )}
        </TabPane>
      </TabContent>
      <div className="d-flex align-items-center justify-content-end">
        {value === 'editor' && (
          <StyledLabel htmlFor="image">
            <Icon icon="CLOUD_UPLOAD" size={16} color="LIGHT" />
            <span className="fs-2 text-light">画像をアップロード</span>
            <input className="d-none" type="file" name="image" id="image" onChange={handleUploadFile} accept="image/*" />
            {isUploading && <Spinner isSmall color="secondary" />}
          </StyledLabel>
        )}
        {isUpdateMode && onClickCancelButton && (
          <Button outlined color="secondary" onClick={onClickCancelButton}>
            キャンセル
          </Button>
        )}
        <div className="ms-2">
          <Button color="primary" onClick={onCompleteEdit} disabled={content.trim() === '' || isUploading}>
            {isUpdateMode ? '更新する' : '投稿する'}
          </Button>
        </div>
      </div>
    </>
  );
};

const StyledParagraphWrapper = styled.div`
  min-height: 286px;
`;

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  margin-right: auto;
  cursor: pointer;
`;

const StyledDiv = styled.div`
  min-height: 170px;
`;
