import { VFC } from 'react';
import NextHeadSeo from 'next-head-seo';
import { IMAGE_PATH } from '~/constants/imagePath';

type Props = {
  siteName?: string;
  title?: string;
  url?: string;
  image?: string;
  description?: string;
  keywords?: string[];
};

const DESCRIPTION = 'Proeco は、個人開発やチーム開発を応援するWEBアプリケーションです！';
const KEYWORDS = 'プロセスエコノミー,個人開発';

export const ProecoOgpHead: VFC<Props> = (props) => {
  const { siteName, title, url, image, description, keywords = [] } = props;

  return (
    <NextHeadSeo
      title={title || 'Proeco'}
      description={description || DESCRIPTION}
      og={{
        title: title || 'Proeco',
        description: description || DESCRIPTION,
        url: url || 'https://www.proeco.app',
        type: 'website',
        image: image || `https://www.proeco.app/${IMAGE_PATH.TWITTER_OGP}`,
        siteName: siteName || 'Proeco',
      }}
      twitter={{
        card: 'summary_large_image',
      }}
      customMetaTags={[
        {
          name: 'keywords',
          content: keywords.length > 0 ? keywords?.join(',') : KEYWORDS,
        },
      ]}
    />
  );
};
