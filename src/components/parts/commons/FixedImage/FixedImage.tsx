import { VFC } from 'react';
import styled from 'styled-components';
import { IMAGE_PATH } from '~/constants';

type Props = {
  imageUrl?: string;
};

export const SkeltonFixedImage: VFC = () => {
  return <StyledSkeltonFixedImage></StyledSkeltonFixedImage>;
};

export const FixedImage: VFC<Props> = ({ imageUrl }) => {
  return (
    <StyledImageWrapper>
      <img
        src={imageUrl || IMAGE_PATH.NO_IMAGE}
        alt={imageUrl || IMAGE_PATH.NO_IMAGE}
        className="overflow-auto"
        loading="lazy"
        referrerPolicy="no-referrer"
        decoding="sync"
      />
    </StyledImageWrapper>
  );
};

const StyledSkeltonFixedImage = styled.div`
  @keyframes loading {
    0% {
      background-color: rgba(0, 0, 0, 0.11);
    }
    50% {
      background-color: rgba(0, 0, 0, 0.05);
    }
    100% {
      background-color: rgba(0, 0, 0, 0.11);
    }
  }
  width: 100%;
  padding-top: 52.5%;
  background-color: rgba(0, 0, 0, 0.11);
  animation: loading 1.5s ease-in-out 0.5s infinite;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 52.5%;
  img {
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;
