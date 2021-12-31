import React, { VFC, ReactNode } from 'react';

import CarouselOriginal from 'react-multi-carousel';
import styled from 'styled-components';

import { COLORS } from '~/constants/colors';

type Props = {
  children: ReactNode;
  autoPlay?: boolean;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 960 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 960, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

export const Carousel: VFC<Props> = ({ children, autoPlay = false }) => {
  return (
    <StyledCarouselOriginal responsive={responsive} showDots arrows={false} autoPlay={autoPlay} infinite={autoPlay}>
      {children}
    </StyledCarouselOriginal>
  );
};

const StyledCarouselOriginal = styled(CarouselOriginal)`
  &.react-multi-carousel-list {
    padding-bottom: 48px;
  }
  .react-multi-carousel-dot-list {
    gap: 4px;
  }
  .react-multi-carousel-dot {
    > button {
      border: none;
      background-color: #ced7fd;
    }
  }
  .react-multi-carousel-dot--active {
    > button {
      background-color: ${COLORS.PRIMARY};
      transform: scale(1.6);
    }
  }
`;
