import React from 'react'

import { auth } from '../firebase'

const SignOutButton = () =>
  <button
    className='w3-button'
    type='button'
    onClick={auth.doSignOut}
  >
    sign out
  </button>

export default SignOutButton
