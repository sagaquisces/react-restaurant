import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import { PasswordForgetForm } from './PasswordForget'
import PasswordChangeForm from './PasswordChange'

import withAuthorization from './withAuthorization'

const AccountPage = (props, { authUser }) =>
  <div className='w3-container'>
    <div className='w3-content' style={{maxWidth: '700px'}}>
      <Header>ACCOUNT: {authUser.email}</Header>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  </div>
AccountPage.contextTypes = {
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AccountPage)
