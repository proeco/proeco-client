import { VFC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

import { Stack } from '@mui/material';
import { Button, Typography } from '~/components/parts/commons/atoms';

type Props = {
  message?: string;
};

export const NotFound: VFC<Props> = ({ message = 'ページが見つかりませんでした' }) => {
  return (
    <StyledStack spacing="20px" alignItems="center">
      <Typography variant="h3">{message}</Typography>
      <Image src="/images/Error_404_SVG.svg" alt="NotFound" width={500} height={315} />
      <Link href="/">
        <a>
          <Button variant="contained">Topページに戻る</Button>
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
