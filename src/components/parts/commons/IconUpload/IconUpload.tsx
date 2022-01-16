import React, { VFC, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon/Icon';
import { GuestTeamIcon } from '~/components/domains/team/TeamIcon';

type Props = {
  onSelectImage: (file: ChangeEvent<HTMLInputElement>) => void;
  currentImagePath?: string;
  size?: number;
  disabled?: boolean;
};

export const IconUpload: VFC<Props> = ({ onSelectImage, currentImagePath, size = 100, disabled }) => {
  return (
    <label className="position-relative" htmlFor="image" aria-disabled={disabled}>
      {currentImagePath ? (
        <img className="rounded-circle border border-primary border-2" width={size} height={size} src={currentImagePath} />
      ) : (
        <GuestTeamIcon size={size} />
      )}
      {!disabled && (
        <StyledOverlay className="d-flex gap-2 align-items-center">
          <StyledIcon icon="IMAGE" color="WHITE" size={20} />
          <p className="fs-4 mb-0 text-white">写真を変更</p>
        </StyledOverlay>
      )}
      <input className="d-none" type="file" name="image" id="image" onChange={onSelectImage} accept="image/*" disabled={disabled} />
    </label>
  );
};

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(92 92 92 / 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const StyledIcon = styled(Icon)<{ size: number }>`
  display: ${(props) => (props.size < 100 ? 'none' : 'block')};
`;
