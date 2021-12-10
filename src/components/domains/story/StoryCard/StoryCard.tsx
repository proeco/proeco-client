import React, { VFC } from 'react';
import { Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = {};

export const StoryCard: VFC<Props> = ({ ...rest }) => {
  return <StyledStoryCard {...rest} />;
};

const StyledStoryCard = styled(MuiCard)`
  padding: 0px;
  box-sizing: border-box;
  position: relative;
`;
