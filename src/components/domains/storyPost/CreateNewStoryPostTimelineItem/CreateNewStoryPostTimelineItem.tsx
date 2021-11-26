import { VFC } from 'react';
import { Box } from '@mui/system';

import { useSuccessNotification } from '~/hooks/useSuccessNotification';

import { UserIcon } from '~/components/domains/user/UserIcon';
import { Editor, Paper } from '~/components/parts/commons';
import { User } from '~/domains';

export const CreateNewStoryPostTimelineItem: VFC<{ currentUser: User }> = ({ currentUser }) => {
  const { notifySuccessMessage } = useSuccessNotification();

  const handleSubmitEditor = () => {
    notifySuccessMessage('TODO');
  };

  return (
    <Box display="flex" alignItems="top" justifyContent="space-between" gap={1}>
      <UserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser._id} />
      <Box width="100%">
        <Paper>
          <Editor content="" onSubmit={handleSubmitEditor} />
        </Paper>
      </Box>
    </Box>
  );
};
