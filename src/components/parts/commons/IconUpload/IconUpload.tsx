import React, { VFC, ChangeEvent } from 'react';
import { styled } from '@mui/system';
import { Avatar } from '@mui/material';
import { Icon } from '../Icon/Icon';
import { UserIcon } from '~/components/domains/user/UserIcon';

type Props = {
  onSelectImage: (file: ChangeEvent<HTMLInputElement>) => void;
  currentImage?: string;
  size?: number;
};

export const IconUpload: VFC<Props> = ({ onSelectImage, currentImage, size = 40 }) => {
  return (
    <label htmlFor="image">
      {currentImage ? (
        <StyledUserIcon size={size} imagePath={currentImage} />
      ) : (
        <StyledAvatar size={size}>
          <Icon icon="Group" color="#ccc" width="100%" />
        </StyledAvatar>
      )}
      <StyledInput type="file" name="image" id="image" onChange={onSelectImage} accept="image/*" />
    </label>
  );
};

const StyledUserIcon = styled(UserIcon)`
  cursor: pointer;
`;

const StyledAvatar = styled(Avatar)<{ size: number }>`
  background-color: white;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  box-sizing: border-box;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  cursor: pointer;
`;

const StyledInput = styled('input')`
  display: none;
`;
