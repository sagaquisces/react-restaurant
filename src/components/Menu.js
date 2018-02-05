import React from 'react'
import PropTypes from 'prop-types'
import MenuList from './MenuList'
import Header from './Header'

const MenuPage = (props, { authUser }) =>
  <div>
    <Header>THE MENU</Header>
    <MenuList authUser={authUser} />
  </div>

MenuPage.contextTypes = {
  authUser: PropTypes.object,
}

export default MenuPage
