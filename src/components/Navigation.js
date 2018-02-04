import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import SignOutButton from './SignOut'
import * as routes from '../constants/routes'

const Navigation = (props, { authUser }) =>
  <div className="w3-top">
    <div className="w3-row w3-padding w3-black">
      { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
      }
    </div>
  </div>

Navigation.contextTypes = {
  authUser: PropTypes.object
}

const NavigationAuth = () =>
  <div>
    <div className='w3-col s3'>
      <Link className='w3-button' to={routes.HOME}>Home</Link>
    </div>
    <div className='w3-col s3'>
      <Link className='w3-button' to={routes.ACCOUNT}>Account</Link>
    </div>
    <div className='w3-col s3'>
      <SignOutButton />
    </div>
  </div>

const NavigationNonAuth = () =>
  <div>
    <div className='w3-col s3'>
      <Link className='w3-button' to={routes.HOME}>Home</Link>
    </div>
    <div className='w3-col s3'>
      <Link className='w3-button' to={routes.SIGN_IN}>Sign In</Link>
    </div>
  </div>

export default Navigation
