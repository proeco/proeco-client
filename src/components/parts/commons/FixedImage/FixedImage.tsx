import { VFC } from 'react';
import styled from 'styled-components';
import { IMAGE_PATH } from '~/constants';

type Props = {
  imageUrl?: string;
};

export const SkeltonFixedImage: VFC = () => {
  return <StyledDiv className="w-100 skelton" />;
};

export const FixedImage: VFC<Props> = ({ imageUrl }) => {
  return (
    <StyledImageWrapper className="w-100 position-relative">
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

const StyledDiv = styled.div`
  padding-top: 52.5%;
`;

const StyledImageWrapper = styled.div`
  padding-top: 52.5%;
  img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
