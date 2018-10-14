import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';
import Signup from '../ui/Signup';

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = (Component) => {
  if (Meteor.userId()){
    return <Redirect to="/dashboard" />;
  } else {
    return <Component />;
  }
};

const onEnterPrivatePage = (Component) => {
  if(!Meteor.userId()){
    return <Redirect to="/"/>;
  } else {
    return <Component /> ;
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/dashboard');
  }
  if (isAuthenticatedPage && !isAuthenticated){
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={ browserHistory }>
    <Switch>
      <Route exact path="/" render={()=> onEnterPublicPage(Login)} />
      <Route path="/dashboard" render={() => onEnterPrivatePage(Dashboard)} />
      <Route path="/signup" render={()=> onEnterPublicPage(Signup)} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
