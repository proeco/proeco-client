import React, { VFC } from 'react';
import { Box } from '@mui/system';
import { StoryPost, User } from '~/domains';
import { IconButton, Link } from '~/components/parts/commons';

type Props = {
  currentUser: User;
  storyPost: StoryPost;
};

export const DisplayStoryPostTimeLineItem: VFC<Props> = ({ currentUser, storyPost }) => {
  return (
    <Box>
      <Box>
        <Link href={'/user/' + currentUser._id}>{currentUser.name}</Link>
        <time dateTime={String(storyPost.createdAt)}>{String(storyPost.createdAt)}</time>
        <IconButton icon="MoreVert" width={20} />
      </Box>
      <Box>{storyPost.content}</Box>
      <Box></Box>
    </Box>
  );
};
