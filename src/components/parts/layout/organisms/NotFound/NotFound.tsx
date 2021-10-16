import { VFC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

import { Stack } from '@mui/material';
import { Button, Typography } from '~/components/parts/commons/atoms';

import { IMAGE_PATH } from '~/constants';

type Props = {
  message?: string;
  ErrorImagePath: string;
};

export const Component: VFC<Props> = ({ message = 'ページが見つかりませんでした', ErrorImagePath }) => {
  return (
    <StyledStack spacing="20px" alignItems="center">
      <Typography variant="h3">{message}</Typography>
      <Image src={ErrorImagePath} alt="NotFound" width={500} height={315} />
      <Link href="/">
        <a>
          <Button variant="contained" bold>
            Topページに戻る
          </Button>
        </a>
      </Link>
    </StyledStack>
  );
};

const StyledStack = styled(Stack)`
  a {
    text-decoration: none;
  }
`;

export const NotFound: VFC<{ message?: string }> = ({ message = 'ページが見つかりませんでした' }) => {
  return <Component message={message} ErrorImagePath={IMAGE_PATH.ERROR} />;
};
