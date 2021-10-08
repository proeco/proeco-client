// eslint-disable-next-line import/named
import { SimplePaletteColorOptions } from '@mui/material/styles';

interface CustomPalette {
  green: SimplePaletteColorOptions;
  black: SimplePaletteColorOptions;
  textColor: SimplePaletteColorOptions;
  borderColor: SimplePaletteColorOptions;
}
declare module '@mui/material/styles/createPalette' {
  // eslint-disable-next-line
  interface PaletteOptions extends CustomPalette {}

  // eslint-disable-next-line
  interface Palette extends CustomPalette {}
}
