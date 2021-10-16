import { VFC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { Button, Typography } from '~/components/parts/commons/atoms';

import { IMAGE_PATH } from '~/constants';

type Props = {
  message?: string;
  ErrorImagePath: string;
  onClickReturnTopButton: () => void;
};

export const Component: VFC<Props> = ({ message = 'ページが見つかりませんでした', ErrorImagePath, onClickReturnTopButton }) => {
  return (
    <StyledStack spacing="20px" alignItems="center">
      <Typography variant="h3">{message}</Typography>
      <Image src={ErrorImagePath} alt="NotFound" width={500} height={315} />
      <Button variant="contained" bold onClick={onClickReturnTopButton}>
        Topページに戻る
      </Button>
    </StyledStack>
  );
};

const StyledStack = styled(Stack)`
  a {
    text-decoration: none;
  }
`;

export const NotFound: VFC<{ message?: string }> = ({ message = 'ページが見つかりませんでした' }) => {
  const router = useRouter();

  return <Component message={message} ErrorImagePath={IMAGE_PATH.ERROR_404} onClickReturnTopButton={() => router.push('/')} />;
};
