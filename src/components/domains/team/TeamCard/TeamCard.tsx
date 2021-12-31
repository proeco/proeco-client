import React, { VFC } from 'react';
import styled from 'styled-components';

import { TeamIcon, SkeltonTeamIcon } from '~/components/domains/team/TeamIcon';
import { Card, FixedImage, SkeltonFixedImage } from '~/components/parts/commons';
import { useOgp } from '~/stores/ogp';

type Props = {
  name: string;
  description: string;
  attachmentId: string;
  url: string;
};

export const SkeltonTeamCard: VFC = () => {
  return (
    <StyledCard headerContent={<SkeltonFixedImage />}>
      <div className="d-flex align-items-center p-2">
        <div className="me-2">
          <SkeltonTeamIcon size={40} />
        </div>
        <StyledSkeltonParagraph className="skelton w-100 rounded-2" />
      </div>
      <StyledSkeltonParagraph className="w-100 skelton mb-2 rounded-2" />
      <StyledSkeltonParagraph className="w-100 skelton rounded-2" />
    </StyledCard>
  );
};

export const TeamCard: VFC<Props> = ({ name, description, attachmentId, url }) => {
  const { data: ogp } = useOgp(url);

  return (
    <StyledCard headerContent={ogp ? <FixedImage imageUrl={ogp?.image} /> : <SkeltonFixedImage />}>
      <StyledDiv className="position-absolute d-flex align-items-end mb-2">
        <TeamIcon size={50} attachmentId={attachmentId} />
        <span className="fw-bold maximum_lines_1 ms-2">{name}</span>
      </StyledDiv>
      <span className="mt-3 fs-3 maximum_lines_2">{description}</span>
    </StyledCard>
  );
};

const StyledSkeltonParagraph = styled.div`
  height: 16px;
`;

const StyledDiv = styled.div`
  top: -25%;
`;

const StyledCard = styled(Card)`
  box-sizing: border-box;
  position: relative;
  top: 0;
  width: 100%;
  transition: all 0.3s;
`;
