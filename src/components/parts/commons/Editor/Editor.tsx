import React, { VFC } from 'react';
import { Box, styled } from '@mui/system';
import { Tab, Tabs } from '@mui/material';

import { TextField, Button } from '~/components/parts/commons';

type Props = {};

export const Editor: VFC<Props> = ({ ...rest }) => {
  return (
    <Box bgcolor="white" p="16px" {...rest}>
      <Box>
        <Tabs aria-label="Editor tabs">
          <Tab label="Markdown" />
          <Tab label="Preview" />
        </Tabs>
        <TextField />
      </Box>
      <Button variant="contained">投稿する</Button>
    </Box>
  );
};

// const StyledTextField = styled(TextField)`
//   width: 100%;
// `;
