import { Box } from '@mui/system';
import { NextPage } from 'next';
import { NotFound } from '~/components/parts/layout/NotFound';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { WithGetAccessControl } from '~/interfaces/accessControl';

const Custom404: WithGetAccessControl<NextPage> = () => {
  return (
    <>
      <ProecoOgpHead />
      <Box mt="100px">
        <NotFound />
      </Box>
    </>
  );
};

Custom404.getAccessControl = () => {
  return { loginRequired: null };
};

export default Custom404;
