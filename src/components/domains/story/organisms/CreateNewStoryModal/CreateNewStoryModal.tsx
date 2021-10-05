import React, { VFC, ComponentProps } from 'react';
import { styled } from '@mui/material/styles';
import { Modal } from '~/components/parts/commons/organisms/Modal';

type Props = ComponentProps<typeof Modal>;

export const CreateNewStoryModal: VFC<Props> = ({ ...rest }) => {
  return <StyledModal {...rest} />;
};

const StyledModal = styled(Modal)``;
