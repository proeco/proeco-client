import React, { FC } from 'react';
import Image from 'next/image';
import { Box, styled } from '@mui/system';
import { Link } from '@mui/material';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Typography } from '~/components/parts/commons/atoms';
import { URLS, IMAGE_PATH } from '~/constants';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickSignInButton: () => void;
};

export const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose, onClickSignInButton }) => {
  const content = (
    <>
      <Box px={1}>
        <Box width="400px" height="60px" mx="auto" position="relative">
          <Image src={IMAGE_PATH.LOGO} layout="fill" objectFit="contain" />
        </Box>

        <Box my="20px">
          <Typography color="textColor.light">Proeco はプロダクト開発を支援するプラットフォームです</Typography>
          <Typography color="textColor.light">あなたの素敵なアイデアを実現しましょう</Typography>
        </Box>

        <StyledLoginButtonWrapper my="20px" display="flex" justifyContent="center" role="button" onClick={onClickSignInButton}>
          <Image src={IMAGE_PATH.SIGN_IN_GOOGLE} height={50} width={190} />
        </StyledLoginButtonWrapper>

        <Typography my="20px" color="textColor.light">
          <Link href={URLS.TERMS}>利用規約</Link>、<Link href={URLS.PRIVACY_POLICY}>プライバシーポリシー</Link>に同意したうえでログインしてください
        </Typography>
      </Box>
    </>
  );

  return <Modal open={isOpen} size="small" title="✨ Proecoへようこそ ✨" content={content} onClose={onClose} />;
};

const StyledLoginButtonWrapper = styled(Box)`
  :hover {
    opacity: 0.8;
  }
`;
