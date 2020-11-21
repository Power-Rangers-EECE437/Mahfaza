import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import SignInSide from './pages/login';
import SignUpSide from './pages/signup';
import Dashboard from './pages/dashboard/Dashboard';

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props
    let loggedIn =  JSON.parse(localStorage.getItem('loggedStatus'));
    console.log(loggedIn);
    return (
      <Route 
        {...props} 
        render={props => (
          loggedIn ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )} 
      />
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Switch>
            <Route path={["/signin", "/", "/login"]} component={SignInSide} exact/>
            <Route path="/signup" component={SignUpSide}/>
            <ProtectedRoute path="/dashboard" component={Dashboard}/>
            <Route component={SignInSide}/>
           </Switch>
  </ThemeProvider>
  </BrowserRouter>,
  document.querySelector('#root'),
);
