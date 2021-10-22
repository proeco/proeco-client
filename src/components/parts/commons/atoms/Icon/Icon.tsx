import React, { VFC } from 'react';
import { MoreVert, Update, Delete } from '@mui/icons-material';

const IconMap = {
  MoreVert: <MoreVert />,
  Update: <Update />,
  Delete: <Delete />,
};

type Props = {
  icon: keyof typeof IconMap;
};

export const Icon: VFC<Props> = ({ icon }) => {
  return IconMap[icon];
};
