import React from 'react';
import {BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css';
import themeFile from './utils/theme';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser } from './redux/actions/userAction';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'; 
import jwtDecode from 'jwt-decode';

import axios from 'axios';

// Components
import Navbar from './components/Navbar'
import AuthRoute from './utils/AuthRoute.js'

// Pages
import home from './pages/home';
import login from './pages/login';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';


axios.defaults.baseURL =
"https://us-central1-hellyeeeah-c3933.cloudfunctions.net/api";


const theme = createMuiTheme(themeFile)


const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch({ type: SET_AUTHENTICATED });
  }
}


function App() {
  return (
    <MuiThemeProvider theme={theme}>
       <Provider store={store}>
        <Router>
          <Navbar/>
            <div className = "container">
              <Switch>

                <AuthRoute exact path="/" component={login} />
                <AuthRoute exact path="/home" component={home}/>
              </Switch>
            </div>
        </Router>

      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
