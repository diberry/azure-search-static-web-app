import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: '#646cff',
      dark: '#535bf2',
      light: '#747bff',
      contrastText: '#000000',
    },
    secondary: {
      main: '#0078d4',
      dark: '#005a9e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#213547',
      secondary: '#6e6e6e',
    },
    action: {
      hover: 'rgba(100, 108, 255, 0.08)',
    },
    divider: '#e0e0e0',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        },
        body: {
          lineHeight: 1.5,
          margin: 0,
          minWidth: 0,
        },
      },
    },
  },
});

export const globalStyles = {
  ':root': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    fontFamily: theme.typography.fontFamily,
    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
  },
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  'button:focus-visible, a:focus-visible': {
    outline: `4px auto ${theme.palette.text.primary}`,
    outlineOffset: theme.spacing(0.25),
  },
};

export default theme;
