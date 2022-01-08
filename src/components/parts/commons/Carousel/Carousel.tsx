import React, { VFC, ReactNode, useState } from 'react';

import CarouselOriginal from 'react-multi-carousel';
import { DotProps } from 'react-multi-carousel/lib/types';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';

import { COLORS } from '~/constants/colors';

interface CustomDotProps extends DotProps {
  changeCurrentAutoPlay: () => void;
}

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

const CustomDot: VFC<CustomDotProps> = ({ onClick, changeCurrentAutoPlay, active }) => {
  const handleClick = () => {
    if (!onClick) return;
    onClick();
    changeCurrentAutoPlay();
  };
  return (
    <li className={`react-multi-carousel-dot ${active && 'react-multi-carousel-dot--active'}`}>
      <button onClick={handleClick}></button>
    </li>
  );
};

export const Carousel: VFC<Props> = ({ children, autoPlay = false }) => {
  const [currentAutoPlay, setCurrentAutoPlay] = useState(autoPlay);

  return (
    <StyledCarouselOriginal
      responsive={responsive}
      showDots
      customDot={<CustomDot changeCurrentAutoPlay={() => setCurrentAutoPlay(false)} />}
      arrows={false}
      autoPlay={currentAutoPlay}
      infinite={true}
    >
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
