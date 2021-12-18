import React, { VFC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, styled } from '@mui/system';
import { Modal, Typography, Link } from '~/components/parts/commons';
import { URLS, IMAGE_PATH } from '~/constants';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal: VFC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const content = (
    <Box>
      <Box width="400px" height="80px" mx="auto" position="relative">
        <Image src={IMAGE_PATH.LOGO} width="400px" height="80px" />
      </Box>

      <Box my="20px">
        <Typography color="textColor.light">Proeco はプロダクト開発を支援するプラットフォームです</Typography>
        <Typography color="textColor.light">あなたの素敵なアイデアを実現しましょう</Typography>
      </Box>

      <StyledLoginButtonWrapper my="20px" display="flex" justifyContent="center" role="button" onClick={() => router.push(URLS.API_LOGIN)}>
        <Image src={IMAGE_PATH.SIGN_IN_GOOGLE} height={50} width={190} />
      </StyledLoginButtonWrapper>

      <Typography my="20px" color="textColor.light">
        <Link href={URLS.TERM} underline="always" target="_blank">
          利用規約
        </Link>
        {/* 、
        <Link href={URLS.PRIVACY_POLICY} underline="always">
          プライバシーポリシー
        </Link> */}
        に同意したうえでログインしてください
      </Typography>
    </Box>
  );

  return <Modal open={isOpen} size="small" emojiId="tada" title="Proecoへようこそ" content={content} onClose={onClose} />;
};

const StyledLoginButtonWrapper = styled(Box)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
