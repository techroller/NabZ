import {createMuiTheme} from '@material-ui/core/styles';

/**
 * Close to the Drop.com pallet.
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffff74',
      main: '#fdce41',
      dark: '#c69d00',
      contrastText: '#000',
    },
  },
});

export default theme;