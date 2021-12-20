import { Box, Grid } from '@mui/material';
import React, { VFC } from 'react';
import { MarkdownToHtmlBody, Paper } from '~/components/parts/commons';
import { TeamCard } from '~/components/domains/team/TeamCard';
import { Team } from '~/domains';

type Props = {
  team: Team;
};

export const TeamHomeTab: VFC<Props> = ({ team }) => {
  return (
    <Grid container>
      <Grid key={team._id} item xs={12} sm={8} px={1} pb={2}>
        <Paper>
          <Box p={2}>
            <MarkdownToHtmlBody content={team.homeContent} />
          </Box>
        </Paper>
      </Grid>
      <Grid key={team._id} item xs={12} sm={4} px={1} pb={2}>
        <TeamCard name={team.name} productId={team.productId} description={team.description} attachmentId={team.iconImageId} url={team.url} />
      </Grid>
    </Grid>
  );
};
