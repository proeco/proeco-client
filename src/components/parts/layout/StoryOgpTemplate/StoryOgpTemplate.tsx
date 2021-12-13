import React, { VFC } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Typography } from '~/components/parts/commons/Typography';

type Props = {
  title: string;
  teamName: string;
};

export const StoryOgpTemplate: VFC<Props> = ({ title, teamName }) => {
  return (
    <StyledHtml>
      <StyledBody>
        <StyledWrapper>
          <StyledTeamInfo>
            <Typography variant="h3" bold>
              {teamName}
            </Typography>
          </StyledTeamInfo>
          <StyledTitle variant="h2" maximum_lines={4}>
            {title}
          </StyledTitle>
        </StyledWrapper>
      </StyledBody>
    </StyledHtml>
  );
};

const StyledHtml = styled('html')`
  margin: 0;
  padding: 0;
`;

const StyledBody = styled('body')`
  margin: 0;
  padding: 0;
`;

const StyledWrapper = styled(Box)`
  width: 1200px;
  height: 630px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: ${`url(${process.env.NEXT_PUBLIC_ROOT_URL}/images/story-ogp.png)`};
  background-size: cover;
  background-position: center center;
`;

const StyledTeamInfo = styled(Box)`
  position: absolute;
  top: 60px;
  left: 80px;
  display: flex;
  align-items: center;
`;

const StyledTitle = styled(Typography)`
  padding-left: 80px;
  padding-right: 80px;
`;
