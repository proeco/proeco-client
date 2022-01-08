import styled from 'styled-components';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { Card, MarkdownToHtmlBody } from '~/components/parts/commons';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';

import { MDS } from '~/constants/mds';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const Term: ProecoNextPage = () => {
  return (
    <DashboardLayout>
      <ProecoOgpHead title="Proeco - 利用規約" />
      <h1 className="text-center fw-bold">利用規約</h1>
      <StyledDiv className="mx-auto">
        <Card>
          <MarkdownToHtmlBody content={MDS.TERM_MD} />
        </Card>
      </StyledDiv>
    </DashboardLayout>
  );
};

const StyledDiv = styled.div`
  max-width: 800px;
`;

Term.getAccessControl = () => {
  return { loginRequired: null };
};

export default Term;
