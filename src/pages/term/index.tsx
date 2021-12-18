import { ReactNode } from 'react';
import { Box } from '@mui/system';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { MarkdownToHtmlBody, Paper, Typography } from '~/components/parts/commons';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { MDS } from '~/constants/mds';

const Term: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead title="Proeco - 利用規約" />
      <Typography variant="h1" align="center" bold my={1}>
        利用規約
      </Typography>
      <Box maxWidth="800px" mx="auto">
        <Paper>
          <MarkdownToHtmlBody content={MDS.TERM_MD} />
        </Paper>
      </Box>
    </>
  );
};

Term.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
Term.getAccessControl = () => {
  return { loginRequired: null };
};

export default Term;
