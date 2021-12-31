import { VFC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button } from '~/components/parts/commons';

import { IMAGE_PATH } from '~/constants';

type Props = {
  message?: string;
  ErrorImagePath: string;
  onClickReturnTopButton: () => void;
};

export const Component: VFC<Props> = ({ message = 'ページが見つかりませんでした', ErrorImagePath, onClickReturnTopButton }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-5">
      <h2>{message}</h2>
      <Image src={ErrorImagePath} alt="NotFound" width={500} height={315} />
      <Button color="primary" onClick={onClickReturnTopButton}>
        Topページに戻る
      </Button>
    </div>
  );
};

export const NotFound: VFC<{ message?: string }> = ({ message = 'ページが見つかりませんでした' }) => {
  const router = useRouter();

  return <Component message={message} ErrorImagePath={IMAGE_PATH.ERROR_404} onClickReturnTopButton={() => router.push('/')} />;
};
