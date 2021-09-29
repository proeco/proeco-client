import { memo, VFC } from 'react';
import Router from 'next/router';
import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export const UserIcon: VFC = memo(() => {
  const goToDashboard = () => {
    Router.push('/dashboard');
  };

  return (
    <Button onClick={() => goToDashboard()}>
      <PersonOutlineIcon />
    </Button>
  );
});
