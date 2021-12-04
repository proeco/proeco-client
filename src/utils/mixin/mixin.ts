import { Breakpoint } from '@mui/system';
import {
  css,
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
  FlattenInterpolation,
  ThemeProps,
  DefaultTheme,
} from 'styled-components';
import { theme } from '~/theme';

export const mixin = {
  /**
   * 特定の breakpoint 以下の画面で style を指定するための mixin
   * @example xs 以下の画面で適応させる場合
   *  ${mixin.breakDown.xs`
   *    background: red;
   *  `}
   */
  breakDown: Object.entries(theme.breakpoints.values).reduce(
    (acc, [sizeName, number]) => {
      acc[sizeName as Breakpoint] = (
        first: CSSObject | TemplateStringsArray,
        ...interpolations: SimpleInterpolation[]
      ): FlattenSimpleInterpolation => css`
        @media (max-width: ${number}px) {
          ${css(first, ...interpolations)}
        }
      `;
      return acc;
    },
    {} as {
      [key in Breakpoint]: (first: CSSObject | TemplateStringsArray, ...interpolations: SimpleInterpolation[]) => FlattenSimpleInterpolation;
    },
  ),
  /**
   * 特定の breakpoints 以上の画面で style を指定するための mixin
   * @example xs 以下の画面で適応させる場合
   *  ${mixin.breakDown.xs`
   *    background: red;
   *  `}
   */
  breakUp: Object.entries(theme.breakpoints.values).reduce(
    (acc, [sizeName, number]) => {
      acc[sizeName as Breakpoint] = (
        first: CSSObject | TemplateStringsArray,
        ...interpolations: SimpleInterpolation[]
      ): FlattenSimpleInterpolation => css`
        @media (min-width: ${number}px) {
          ${css(first, ...interpolations)}
        }
      `;
      return acc;
    },
    {} as {
      [key in Breakpoint]: (first: CSSObject | TemplateStringsArray, ...interpolations: SimpleInterpolation[]) => FlattenSimpleInterpolation;
    },
  ),
  /**
   * 特定の border に Animation を指定するための mixin
   * @example $isActiveがtrueの時にanimationが発火
   * ${(props) => props.$isActive && mixin.outlineAnimation()};
   */
  outlineAnimation: (): FlattenInterpolation<ThemeProps<DefaultTheme>> => {
    return css`
      @keyframes borderKeyframes {
        0% {
          outline: ${(props) => `2px solid ${props.theme.palette.primary.main}`};
        }
        95% {
          outline: ${(props) => `2px solid ${props.theme.palette.primary.main}`};
        }
        100% {
          outline: 2px solid transparent;
        }
      }
      animation-name: borderKeyframes;
      animation-duration: 4s;
      animation-timing-function: linear;
    `;
  },
};
