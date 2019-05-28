import React from 'react';
import {Provider} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import Body from "./components/Body";

import theme from './theme';

const App = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            NabZ - URL Nabber
            </Typography>
        </Toolbar>
      </AppBar>
      <Provider store={props.store}>
        <Body />
      </Provider>    
    </MuiThemeProvider>
  );
}

// const App = () => {
//   return (
//     <MuiThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h5">
//             NabZ - URL Nabber
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Body/>
//     </MuiThemeProvider>
//   );
// };

export default App;
