import { createTheme } from '@mui/material/styles';

import { COLORS } from '~/constants';

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
      light: COLORS.PRIMARY_LIGHT,
    },
    secondary: {
      main: COLORS.SECONDARY,
    },
    error: {
      main: COLORS.ERROR,
    },
    green: {
      main: COLORS.GREEN,
    },
    black: {
      main: COLORS.BLACK,
    },
    textColor: {
      main: COLORS.TEXT,
      light: COLORS.TEXT_LIGHT,
    },
    borderColor: {
      main: COLORS.BORDER,
    },
    backgroundColor: {
      main: COLORS.BACKGROUND,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
