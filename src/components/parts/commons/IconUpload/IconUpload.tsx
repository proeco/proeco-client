import React, { VFC, ChangeEvent } from 'react';
import { Box } from '@mui/system';
import { UserIcon } from '~/components/domains/user/UserIcon';

type Props = {
  onSelectImage: (file: ChangeEvent<HTMLInputElement>) => void;
  currentImage: string;
};

export const IconUpload: VFC<Props> = ({ onSelectImage, currentImage }) => {
  return (
    <Box>
      <UserIcon size={40} imagePath={currentImage} />
      <input type="file" name="image" onChange={onSelectImage} accept="image/*" />
    </Box>
  );
};
