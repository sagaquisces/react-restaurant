import React from 'react'
import Header from './Header'

const HomePage = (props, { authUser }) =>
  <div className='bgimg w3-display-container w3-grayscale-min'>
    <div className='w3-center w3-padding-64'>
      <span className='w3-text-white' style={{fontSize: '90px'}}>the<br />Cafe</span>
    </div>
    <div className='w3-display-bottomleft w3-center w3-padding-large w3-hide-small'>
      <span className='w3-tag'>Open from 6am to 5pm</span>
    </div>
    <div className="w3-display-bottomright w3-center w3-padding-large">
      <span className="w3-text-white">15 Adr street, 5015</span>
    </div>
  </div>

export default HomePage
