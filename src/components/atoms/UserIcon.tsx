import { memo, VFC } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from '@mui/material';

import { DASHBOARD_PATH } from '../../constants/urls';

export const UserIcon: VFC = memo(() => {
  return (
    <Link
      href={DASHBOARD_PATH}
      sx={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#fff',
      }}
    >
      <PersonOutlineIcon sx={{ color: '#ccc', width: '100%', height: 'auto' }} />
    </Link>
  );
});
