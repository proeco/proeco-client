import React, { FC } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/client';
import { Box, styled } from '@mui/system';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Typography } from '~/components/parts/commons/atoms';
import { IMAGE_PATH } from '~/constants';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const content = (
    <>
      <Box px={7} py={2}>
        <Box width="100%" height="6rem" mx="auto" position="relative">
          <Image src={IMAGE_PATH.LOGO} layout="fill" objectFit="contain" />
        </Box>

        <Box my="8px">
          <Typography color="textColor.light">Proeco はプロダクト開発を支援するプラットフォームです。</Typography>
          <Typography>あなたの素敵なアイデアを実現しましょう</Typography>
        </Box>

        <StyledLoginButtonWrapper my="12px" display="flex" justifyContent="center" role="button" onClick={() => signIn('google')}>
          <Image src={IMAGE_PATH.SIGN_IN_GOOGLE} height={46} width={191} />
        </StyledLoginButtonWrapper>
        <Typography my="8px">利用規約、プライバシーポリシーに同意したうえでログインしてください</Typography>
      </Box>
    </>
  );

  // return <Modal open={isOpen} title="✨ Proecoへようこそ！ ✨" content={content} onClose={onClose} />;
  return <Modal open title="✨ Proecoへようこそ！ ✨" content={content} onClose={onClose} />;
};

const StyledLoginButtonWrapper = styled(Box)`
  :hover {
    opacity: 0.8;
  }
`;
