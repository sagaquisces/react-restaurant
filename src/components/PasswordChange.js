import React, { Component } from 'react'

import { auth } from '../firebase'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const { passwordOne } = this.setState

    auth.doPasswordUpdate(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === ''

    return (
      <div className='w3-card w3-padding'>
        <form className='w3-container' onSubmit={this.onSubmit}>
          <input
            className='w3-input w3-border w3-hover-sand'
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type='password'
            placeholder='New Password'
          />
          <input
            className='w3-input w3-border w3-hover-sand'
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type='password'
            placeholder='Confirm New Password'
          />
          <button class="w3-btn w3-teal" disabled={isInvalid} type='submit'>
            Change My Password
          </button>

          { error && <p>{error.message}</p> }
        </form>
      </div>
    )
  }
}

export default PasswordChangeForm
