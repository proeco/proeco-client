import React, { VFC } from 'react';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Emoji, Typography } from '~/components/parts/commons';

type Props = {
  emojisInfo: { emojiId: string; count: number }[];
};

export const EmojiCountResult: VFC<Props> = ({ emojisInfo }) => {
  return (
    <Box display="flex" alignItems="center" gap="12px" bgcolor="#e5e5e5" width="fit-content" borderRadius="18px" p="0 8px">
      {emojisInfo.map((emojiInfo, i) => (
        <StyledBox key={i}>
          <Emoji emojiId={emojiInfo.emojiId} size={20} />
          <Typography variant="caption">{emojiInfo.count}</Typography>
        </StyledBox>
      ))}
    </Box>
  );
};

const StyledBox = styled(Box)`
  cursor: pointer;
  padding: 8px;
  transition: all ease 100ms;
  &:hover {
    transform: scale(1.3);
  }
`;
