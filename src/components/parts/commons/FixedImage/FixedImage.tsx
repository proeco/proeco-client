import { VFC } from 'react';
import { styled } from '@mui/system';
import { IMAGE_PATH } from '~/constants';

type Props = {
  imageUrl?: string;
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

const StyledImageWrapper = styled('div')`
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
