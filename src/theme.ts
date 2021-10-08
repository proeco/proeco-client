import { createTheme } from '@mui/material/styles';

import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR, SECONDARY_COLOR, GREEN_COLOR, TEXT_COLOR, TEXT_LIGHT_COLOR, BORDER_COLOR, BLACK_COLOR } from '~/constants/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      light: PRIMARY_LIGHT_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    green: {
      main: GREEN_COLOR,
    },
    black: {
      main: BLACK_COLOR,
    },
    textColor: {
      main: TEXT_COLOR,
      light: TEXT_LIGHT_COLOR,
    },
    borderColor: {
      main: BORDER_COLOR,
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
