import React from 'react'
import PropTypes from 'prop-types'
import MenuList from './MenuList'
import Header from './Header'

const HomePage = (props, { authUser }) =>
  <div>
    <Header>Home Page</Header>
    <MenuList authUser={authUser} />
  </div>

HomePage.contextTypes = {
  authUser: PropTypes.object,
}

export default HomePage
