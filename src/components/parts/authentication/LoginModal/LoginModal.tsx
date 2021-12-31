import React, { VFC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import { Modal, Link } from '~/components/parts/commons';
import { URLS, IMAGE_PATH } from '~/constants';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal: VFC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const content = (
    <>
      <div className="text-center">
        <Image src={IMAGE_PATH.LOGO} width="400px" height="80px" />
      </div>

      <p className="text-light mt-3">Proeco はプロダクト開発を支援するプラットフォームです あなたの素敵なアイデアを実現しましょう</p>

      <div className="text-center">
        <StyledLoginButton
          className="c-pointer"
          src={IMAGE_PATH.SIGN_IN_GOOGLE}
          height={50}
          width={190}
          onClick={() => router.push(URLS.API_LOGIN)}
        />
      </div>

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
    </>
  );

  return <Modal open={isOpen} emojiId="tada" title="Proecoへようこそ" content={content} onClose={onClose} />;
};

const StyledLoginButton = styled(Image)`
  :hover {
    opacity: 0.8;
  }
`;
