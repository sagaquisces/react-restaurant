import React from 'react'
import PropTypes from 'prop-types'
import MenuList from './MenuList'
import Header from './Header'

const MenuPage = (props, { authUser }) =>
  <div className='w3-container'>
    <div className='w3-content' style={{maxWidth: '700px'}}>
      <Header>THE MENU</Header>
      <MenuList authUser={authUser} />
    </div>
  </div>

MenuPage.contextTypes = {
  authUser: PropTypes.object,
}

export default MenuPage
