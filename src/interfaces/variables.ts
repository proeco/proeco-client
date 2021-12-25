export const BootstrapColor = {
  INFO: 'info',
  SUCCESS: 'success',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  WHITE: 'white',
  BLACK: 'black',
  WARNING: 'warning',
  DANGER: 'danger',
  LIGHT: 'light',
  TWITTER: 'twitter',
} as const;
export type BootstrapColor = keyof typeof BootstrapColor;

export const BootstrapBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;
export type BootstrapBreakpoints = keyof typeof BootstrapBreakpoints;
