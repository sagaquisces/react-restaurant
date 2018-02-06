import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Header from './Header'
import { SignUpLink } from './SignUp'
import { PasswordForgetLink } from './PasswordForget'
import { auth } from '../firebase'
import * as routes from '../constants/routes'

const SignInPage = ({ history }) =>
  <div className='w3-container'>
    <div className='w3-content' style={{maxWidth: '700px'}}>
      <Header>Sign In</Header>
      <SignInForm history={history} />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state

    const {
      history,
    } = this.props

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.MENU)
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state

    const isInvalid =
      password === '' ||
      email === ''

    return (
      <div className='w3-card w3-padding'>
        <form className='w3-container' onSubmit={this.onSubmit}>
          <input
            className='w3-input w3-border w3-hover-sand'
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type='text'
            placeholder='Email Address'
          />
          <input
            className='w3-input w3-border w3-hover-sand'
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type='password'
            placeholder='Password'
          />
          <button className='w3-btn w3-teal' disabled={isInvalid} type="submit">
            Sign In
          </button>

          { error && <p>{error.message}</p> }
        </form>
      </div>
    )
  }
}

export default withRouter(SignInPage)

export {
  SignInForm
}
