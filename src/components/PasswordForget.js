import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

import { auth } from '../firebase'

const PasswordForgetPage = () =>
  <div>
    <Header>OOPS...FORGOT MY PASSWORD</Header>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  error: null,
}

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const { email } = this.state

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render() {
    const {
      email,
      error,
    } = this.state

    const isInvalid = email === ''

    return (
      <div className='w3-card w3-padding'>
        <form className='w3-container' onSubmit={this.onSubmit}>
          <input
            className='w3-input w3-border w3-hover-sand'
            value={this.state.email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type='email'
            placeholder='Email Address'
          />
          <button className="w3-btn w3-teal" disabled={isInvalid} type='submit'>
            Reset My Password
          </button>

          { error && <p>{error.message}</p> }
        </form>
      </div>
    )
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to='/pw-forget'>Forgot Password?</Link>
  </p>

export default PasswordForgetPage

export {
  PasswordForgetForm,
  PasswordForgetLink,
}
