import type { NextPage } from 'next';

import { Button, Container } from '@mui/material';
import { User } from '~/domains';

const Home: NextPage = () => {
  const user = new User({ name: 'hoge' });
  console.log(user);
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <h1>Top Page</h1>
      <Button variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }}>
        Start!!
      </Button>
    </Container>
  );
};

export default Home;
