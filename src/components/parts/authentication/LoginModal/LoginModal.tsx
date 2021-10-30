import React, { VFC } from 'react';
import Image from 'next/image';
import { Box, styled } from '@mui/system';
import { Modal } from '~/components/parts/commons/Modal';
import { Typography, Link } from '~/components/parts/commons/atoms';
import { URLS, IMAGE_PATH } from '~/constants';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickSignInButton: () => void;
  logoImagePath: string;
  signInGoogleImagePath: string;
};

export const Component: VFC<Props> = ({ isOpen, onClose, onClickSignInButton, logoImagePath, signInGoogleImagePath }) => {
  const content = (
    <Box>
      <Box width="400px" height="80px" mx="auto" position="relative">
        <Image src={logoImagePath} width="400px" height="80px" />
      </Box>

      <Box my="20px">
        <Typography color="textColor.light">Proeco はプロダクト開発を支援するプラットフォームです</Typography>
        <Typography color="textColor.light">あなたの素敵なアイデアを実現しましょう</Typography>
      </Box>

      <StyledLoginButtonWrapper my="20px" display="flex" justifyContent="center" role="button" onClick={onClickSignInButton}>
        <Image src={signInGoogleImagePath} height={50} width={190} />
      </StyledLoginButtonWrapper>

      <Typography my="20px" color="textColor.light">
        <Link href={URLS.TERMS} underline="always">
          利用規約
        </Link>
        、
        <Link href={URLS.PRIVACY_POLICY} underline="always">
          プライバシーポリシー
        </Link>
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

export const LoginModal: VFC<Omit<Props, 'logoImagePath' | 'signInGoogleImagePath'>> = ({ isOpen, onClose, onClickSignInButton }) => {
  return (
    <Component
      isOpen={isOpen}
      onClose={onClose}
      onClickSignInButton={onClickSignInButton}
      logoImagePath={IMAGE_PATH.LOGO}
      signInGoogleImagePath={IMAGE_PATH.SIGN_IN_GOOGLE}
    />
  );
};
