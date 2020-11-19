import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import SignInSide from './login';
import SignUpSide from './signup';


ReactDOM.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Switch>
            <Route path={["/signin","/", "/login"]} component={SignInSide} exact/>
            <Route path="/signup" component={SignUpSide}/>
            <Route component={Error}/>
           </Switch>
  </ThemeProvider>
  </BrowserRouter>,
  document.querySelector('#root'),
);
