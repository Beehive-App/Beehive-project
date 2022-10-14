import { createTheme } from '@mui/material';

export const mainAppTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      // main: '#59f7f5',
      main: '#F9C901',
    },
    secondary: {
      main: '#bc00ff',
    },
    background: {
      default: '#ffffff',
    },
    error: {
      main: '#d40816',
    },
    warning: {
      main: '#ea9251',
    },
    info: {
      main: '#9df1de',
    },
    success: {
      main: '#55ef5d',
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  typography: {
    fontFamily: 'Source Sans Pro',
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});