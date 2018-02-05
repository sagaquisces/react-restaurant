import React from 'react'

const Header = ({children}) =>
  <div>
    <h5 className='w3-center w3-padding-64'>
      <span className='w3-tag w3-wide'>{children}</span>
    </h5>
  </div>

export default Header
