import React from 'react'

import { auth } from '../firebase'

const SignOutButton = () =>
  <button
    className='w3-button'
    type='button'
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>

export default SignOutButton
