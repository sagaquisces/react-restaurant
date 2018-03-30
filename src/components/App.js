import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './Navigation'
import HomePage from './Home'
import MenuPage from './Menu'
import SignUpPage from './SignUp'
import SignInPage from './SignIn'
import PasswordForgetPage from './PasswordForget'
import AccountPage from './Account'
import Footer from './Footer'

import './App.css'

import * as routes from '../constants/routes'
import withAuthentication from './withAuthentication'

const App = () =>
  <Router>
    <div className='w3-large'>
      <Navigation />
      <Route
        exact path={routes.HOME}
        component={() => <HomePage />}
      />
      <Route
        exact path={routes.MENU}
        component={() => <MenuPage />}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUpPage />}
      />
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />
      <Route
        exact path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route
        exact path={routes.ACCOUNT}
        component={() => <AccountPage />}
      />
      <Footer />
    </div>
  </Router>



export default withAuthentication(App);
