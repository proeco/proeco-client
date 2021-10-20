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
  typography: {
    h1: {
      fontSize: 48,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 24,
    },
    h4: {
      fontSize: 20,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
    button: {
      fontSize: 14,
    },
    caption: {
      fontSize: 12,
    },
    overline: {
      fontSize: 10,
    },
  },
});
