import type { NextPage } from 'next';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';

import { User } from '~/domains';

const Home: NextPage = () => {
  const user = new User({ name: 'hoge' });
  console.log(user);
  return (
    <p>test</p>
    // <Container
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: '100%',
    //     height: '100vh',
    //   }}
    // >
    //   <h1>Top Page</h1>
    //   <Button variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }}>
    //     Start!!
    //   </Button>
    // </Container>
  );
};

export default Home;
