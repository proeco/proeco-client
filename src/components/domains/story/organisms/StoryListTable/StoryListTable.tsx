import { useState, VFC } from 'react';
// import { useRouter } from 'next/router';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { restClient } from '~/utils/rest-client';
import { Typography } from '~/components/parts/commons/atoms';
import { useStories } from '~/stores/story/useStories';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { DeleteStoryModal } from '~/components/domains/story/organisms/DeleteStoryModal';
import { StoryTableRow } from '~/components/domains/story/organisms/StoryTableRow';

import { COLORS } from '~/constants';
import { Story } from '~/domains';

type Props = {
  page: number;
  limit: 10;
};

export const StoryListTable: VFC<Props> = ({ page, limit }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: stories, mutate: mutateStories } = useStories({
    userId: currentUser?._id,
    page,
    limit,
  });

  // const router = useRouter();
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const handleDeleteStory = async () => {
    try {
      await restClient.apiDelete(`/stories/${storyToDelete?._id}`);
      setStoryToDelete(null);
      mutateStories();
      notifySuccessMessage('ストーリーを削除しました!');
    } catch (error) {
      notifyErrorMessage('ストーリーの削除に失敗しました!');
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledHeaderTableCell>
                <Typography color={COLORS.TEXT_LIGHT} variant="caption">
                  ストーリー名
                </Typography>
              </StyledHeaderTableCell>
              <StyledHeaderTableCell align="right">
                <Typography color={COLORS.TEXT_LIGHT} variant="caption">
                  ステータス
                </Typography>
              </StyledHeaderTableCell>
              <StyledHeaderTableCell align="right">
                <Typography color={COLORS.TEXT_LIGHT} variant="caption">
                  応援者
                </Typography>
              </StyledHeaderTableCell>
              <StyledHeaderTableCell align="right">
                <Typography color={COLORS.TEXT_LIGHT} variant="caption">
                  最終更新日
                </Typography>
              </StyledHeaderTableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>{stories && stories.docs.map((doc) => <StoryTableRow story={doc} key={doc._id} />)}</TableBody>
        </Table>
      </TableContainer>
      <DeleteStoryModal onClose={() => setStoryToDelete(null)} onDeleteStory={handleDeleteStory} storyToDelete={storyToDelete} />
    </>
  );
};

const StyledHeaderTableCell = styled(TableCell)`
  &.MuiTableCell-root {
    padding: 6px 16px;
  }
`;
