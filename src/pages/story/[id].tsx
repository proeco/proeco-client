import { GetServerSideProps, NextPage } from 'next';
import { Box } from '@mui/system';

import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains/story';

import { Typography } from '~/components/parts/commons/atoms';
import { ProecoOgpHead } from '~/components/parts/layout/organisms/ProecoOgpHead';

type Props = {
  story?: Story;
};

const StoryPage: NextPage<Props> = ({ story }) => {
  console.log(story);

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
    return { props: { story } };
  } catch (error) {
    return { props: {} };
  }
};

export default StoryPage;
