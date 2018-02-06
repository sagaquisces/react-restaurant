import React, { Component } from 'react'
import Header from './Header'
import {
  Link,
  withRouter,
} from 'react-router-dom'

import { auth, db } from '../firebase'
import * as routes from '../constants/routes'

const SignUpPage = ({ history }) =>
<div className='w3-container'>
  <div className='w3-content' style={{maxWidth: '700px'}}>
      <Header>SignUp</Header>
      <SignUpForm history={history}/>
    </div>
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state

    const {
      history
    } = this.props

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }))
            history.push(routes.HOME)
          })
          .catch(error => {
            this.setState(byPropKey('error', error))
          })
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <div className='w3-card w3-padding'>
        <form className='w3-container' onSubmit={this.onSubmit}>
          <input
            className='w3-input w3-border w3-hover-sand'
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            type='text'
            placeholder='Full Name'
          />
          <input
            className='w3-input w3-border w3-hover-sand'
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type='text'
            placeholder='Email Address'
          />
          <input
            className='w3-input w3-border w3-hover-sand'
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type='password'
            placeholder='Password'
          />
          <input
            className='w3-input w3-border w3-hover-sand'
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type='password'
            placeholder='Confirm Password'
          />
          <button className ='w3-btn w3-teal' disabled={isInvalid} type='submit'>
            Sign Up
          </button>

          { error && <p>{error.message}</p> }
        </form>
      </div>
    )
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage)

export {
  SignUpForm,
  SignUpLink,
}
