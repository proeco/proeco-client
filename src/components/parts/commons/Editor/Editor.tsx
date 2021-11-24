import React, { VFC, useState } from 'react';
import { Box, styled } from '@mui/system';
// import { styled } from '@mui/material/styles';
import { Tab, Tabs } from '@mui/material';

import { TextField, Button } from '~/components/parts/commons';

type Props = {};

export const Editor: VFC<Props> = ({ ...rest }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box bgcolor="white" p="16px" {...rest}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="Editor tabs">
          <Tab label="Markdown" />
          <Tab label="Preview" />
        </Tabs>
        <StyledTextField multiline />
      </Box>
      <Button variant="contained">投稿する</Button>
    </Box>
  );
};

const StyledTextField = styled(TextField)`
  width: 100%;
`;
