import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import NewMenuItemForm from './NewMenuItemForm'
import SortableMenuComponent from './SortableMenuComponent'

const MenuPage = (props, { authUser }) =>
  <div className='w3-container'>
    <div className='w3-content' style={{maxWidth: '700px'}}>
      <Header>THE MENU</Header>
      <SortableMenuComponent authUser={authUser}/>
    </div>
  </div>

MenuPage.contextTypes = {
  authUser: PropTypes.object,
}

export default MenuPage
