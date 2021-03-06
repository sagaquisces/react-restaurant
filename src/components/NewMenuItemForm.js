import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const NewMenuItemForm = ({mode, onNewMenuItemCreation}) => {
  let _title = null
  let _desc = null
  let _price = null
  let _category = null

  function handleNewMenuItemFormSubmit(event) {
    event.preventDefault()
    onNewMenuItemCreation({title: _title.value, desc: _desc.value, price: _price.value, objectID: v4(),}, _category.value)
    _title.value = ''
    _desc.value = ''
    _price.value = ''
  }

  return (
    <div className='w3-padding'>
      <form className='w3-container' onSubmit={handleNewMenuItemFormSubmit}>
        <input
          className='w3-input w3-border w3-hover-sand'
          type='text'
          id='title'
          placeholder='Name of menu item'
          ref={(input) => {_title = input}}
        />
        <textarea
          className='w3-input w3-border w3-hover-sand'
          id='description'
          placeholder='Brief description'
          ref={(input) => {_desc = input}}
        />
        <input
          className='w3-input w3-border w3-hover-sand'
          type='text'
          id='price'
          placeholder='Price (ex., 5.50)'
          ref={(input) => {_price = input}}
        />
        <select
          className="w3-select"
          name="option"
          ref={(input) => {_category = input}}
        >
          <option value={mode} selected>Choose your menu category</option>
          <option value="eat">Eat</option>
          <option value="drink">Drink</option>

        </select>

        <button className="w3-btn w3-teal" type='submit'>Add</button>
      </form>
    </div>
  )
}

NewMenuItemForm.propTypes = {
  onNewMenuItemCreation: PropTypes.func
}

export default NewMenuItemForm
