import Head from 'next/head';
import { VFC } from 'react';
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
    <Head>
      <title>{title || 'Proeco'}</title>
      <meta name="description" content={description || DESCRIPTION} />
      <meta name="keywords" content={keywords.length > 0 ? keywords?.join(',') : KEYWORDS} />
      <meta property="og:site_name" content={siteName || 'Proeco'} />
      <meta property="og:title" content={title || 'Proeco'} />
      <meta property="og:url" content={url || 'https://www.proeco.app'} />
      <meta property="og:image" content={image || `https://www.proeco.app/${IMAGE_PATH.TWITTER_OGP}`} />
      <meta property="og:description" content={description || DESCRIPTION} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || 'Proeco'} />
      <meta name="twitter:image" content={image || `https://www.proeco.app/${IMAGE_PATH.TWITTER_OGP}`} />
      <meta name="twitter:description" content={description || DESCRIPTION} />
    </Head>
  );
};
