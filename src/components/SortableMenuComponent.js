import React, { Component } from 'react'
import NewMenuItemForm from './NewMenuItemForm'
import { db } from '../firebase'

import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

const data = {
  eat: [],
  drink: [],
  mode: 'eat'
};


const SortableMenuListItem = SortableElement(({value, authUser, onDismiss}) => {

  let item = <div>
    <h5>{value.title}</h5>
    <p className='w3-text-grey'>{value.desc}{' '}{value.price}</p>
  </div>
  if(authUser) {
    return (
      <div>
        <button
          className="w3-btn w3-red w3-small"
          onClick={() => onDismiss(value.objectID, data.mode)}
          type='button'
        >
          DELETE
        </button>
        <div>
          {item}
        </div>
      </div>
    )
  }
  return (
    <div>
      {item}
    </div>
  )
})

const SortableMenuList = SortableContainer(({items, authUser, onDismiss}) => {
  if(authUser) {
    return (
      <div>
        {items.map((value, index) => (

          <SortableMenuListItem key={`item-${index}`} index={index} value={value} onDismiss={onDismiss} authUser={authUser}/>

        ))}
      </div>
    )
  }
  return (
    <div>
      {items.map((value, index) => (
        <SortableMenuListItem disabled key={`item-${index}`} index={index} value={value} authUser={authUser}/>
      ))}
    </div>
  )
})


class SortableMenuComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: data,
      isLoading: true,
    }
  }

  componentDidMount() {
    db.onceGetData().then(snapshot => {
      let state = Object.assign({},this.state)
      let dataSnap = snapshot.val()
      let eat = dataSnap.eat ? dataSnap.eat : false
      let drink = dataSnap.drink ? dataSnap.drink : false
      state.data.eat = eat ? dataSnap.eat : []
      state.data.drink = drink ? dataSnap.drink : []

      this.setState({data: state.data, isLoading: false,})
    })
  }

  handleClick = (e, newMode) => {
    let state = this.state
    console.log('handleClick')
    console.log(state)
    state.data.mode = newMode
    this.setState({data: state.data})
  }

  onDismiss = (i, mode) => {
    let data = this.state.data
    const isNotId = item => item.objectID !== i
    if (mode==='eat') {
      const newList = this.state.data.eat.filter(isNotId)
      alert(newList)
      data.eat = newList
    } else {
      const newList = this.state.data.drink.filter(isNotId)
      alert(newList)
      data.drink = newList
    }
    this.setState({...data})
  }

  onSave = () => {
    console.log('onSave state: ' + this.state.data)
    let data = Object.assign({}, this.state.data)
    db.doCreateData(data.eat, data.drink, data.mode);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    let prevData = this.state.data
    let mode = this.state.data.mode
    if(mode==='eat') {
      prevData.eat = arrayMove(data.eat, oldIndex, newIndex)
    } else {
      prevData.drink = arrayMove(data.drink, oldIndex, newIndex)
    }
    this.setState({
      data: data
    });
  }

  handleAddingNewMenuItemToList = (newItem, category) => {
    let state = Object.assign({}, this.state)
    console.log('Here is a copy of state')
    console.log(state)
    console.log('Here is the newItem')
    console.log(newItem)
    console.log(category)
    if(category==='eat') {
      state.data.eat.push(newItem)
    } else {
      state.data.drink.push(newItem)
    }
    console.log('mutated data')
    console.log(data)
    this.setState({data: state.data})

  }

  render() {
    console.log(this.state.data)
    const {data, isLoading} = this.state
    const {authUser} = this.props

    let listItems = 'There is nothing to show'

    if (!isLoading && ((data.eat.length && (data.mode === 'eat')) || (data.drink.length && (data.mode === 'drink')))) {
      let myList = []
      if (data.mode === 'eat') {
        myList=this.state.data.eat
      } else {
        myList=this.state.data.drink
      }
      listItems = <SortableMenuList items={myList} onSortEnd={this.onSortEnd} onDismiss={this.onDismiss} authUser={authUser}/>
    }

    return (
      <div>
        {authUser && <NewMenuItemForm mode={this.state.data.mode} onNewMenuItemCreation={this.handleAddingNewMenuItemToList}/>}
        <div className='w3-row w3-center w3-card w3-padding'>
          <a
            href='#'
            onClick={(e) => this.handleClick(e, 'eat')}
          >
            <div className={!isLoading && data && data.mode==='eat' ? 'w3-col w3-dark-grey s6 tablink' : 'w3-col s6 tablink'}>
              Eat
            </div>
          </a>
          <a
            href='#'
            onClick={(e) => this.handleClick(e, 'drink')}
          >
            <div className={!isLoading && data && data.mode==='drink' ? 'w3-col w3-dark-grey s6 tablink' : 'w3-col s6 tablink'}>
              Drink
            </div>
          </a>
        </div>
        <div className='w3-container w3-padding-48 w3-card'>
          {isLoading? <Loading /> : listItems}
        </div>
        { authUser &&
          <button
            className="w3-btn w3-teal"
            onClick={() => this.onSave()}
            type='button'
          >Save All</button>
        }

      </div>
    )
  }
}


const Loading = () =>
  <div>Loading ...</div>

export default SortableMenuComponent
