import React, { VFC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, styled } from '@mui/system';
import { Modal, Link } from '~/components/parts/commons';
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
        <p className="text-light">Proeco はプロダクト開発を支援するプラットフォームです あなたの素敵なアイデアを実現しましょう</p>
      </Box>

      <StyledLoginButtonWrapper my="20px" display="flex" justifyContent="center" role="button" onClick={() => router.push(URLS.API_LOGIN)}>
        <Image src={IMAGE_PATH.SIGN_IN_GOOGLE} height={50} width={190} />
      </StyledLoginButtonWrapper>

      <p className="text-light">
        <Link href={URLS.TERM} isShowUnderLine target="_blank">
          利用規約
        </Link>
        {/* 、
        <Link href={URLS.PRIVACY_POLICY} underline="always">
          プライバシーポリシー
        </Link> */}
        に同意したうえでログインしてください
      </p>
    </Box>
  );

  return <Modal open={isOpen} emojiId="tada" title="Proecoへようこそ" content={content} onClose={onClose} />;
};

const StyledLoginButtonWrapper = styled(Box)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
