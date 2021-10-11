import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box } from '@mui/system';

import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains/story';

import { Typography } from '~/components/parts/commons/atoms';
import { ProecoOgpHead } from '~/components/parts/layout/organisms/ProecoOgpHead';
import { useStory } from '~/stores/story/useStory';

type Props = {
  storyFromServerSide?: Story;
};

const StoryPage: NextPage<Props> = ({ storyFromServerSide }) => {
  const router = useRouter();

  const { id } = router.query;
  const { data: story } = useStory(id as string, storyFromServerSide);

  if (!story) {
    return null;
  }

  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h2" bold>
            {story.title}
          </Typography>
        </Box>
        <Typography variant="h4">{story.description}</Typography>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const { data: story } = await restClient.apiGet(`/stories/${id}`);
    return { props: { storyFromServerSide: story } };
  } catch (error) {
    return { props: {} };
  }
};

export default StoryPage;
