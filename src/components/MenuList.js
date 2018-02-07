import React, { Component } from 'react'
import NewMenuItemForm from './NewMenuItemForm'
import { db } from '../firebase'

const data = {
  eat: [],
  drink: [],
  mode: 'eat'
};


class MenuList extends Component {
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

  sort = (list, dragging) => {
    let data = this.state.data
    let mode = this.state.data.mode
    if(mode==='eat') {
      data.eat = list
    } else {
      data.drink = list
    }
    data.dragging = dragging
    this.setState({...data})
  }

  dragEnd = () => {
    let mode = this.state.data.mode
    if(mode==='eat') {
      this.sort(this.state.data.eat, undefined)
    } else {
      this.sort(this.state.data.drink, undefined)
    }
  }

  dragStart = (e) => {
    this.dragged = Number(e.currentTarget.dataset.id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', null)
  }

  dragOver = (e) => {
    e.preventDefault()
    let mode = this.state.data.mode
    let over = e.currentTarget
    let dragging = this.state.data.dragging
    let from = isFinite(dragging) ? dragging : this.dragged
    let to = Number(over.dataset.id)
    if((e.clientY - over.offsetTop) > (over.offsetHeight /2)) to++
    if(from < to) to--

    // Move from 'a' to 'b'
    let items = []
    if(mode==='eat') {
      items=this.state.data.eat
    } else {
      items=this.state.data.drink
    }
    items.splice(to, 0, items.splice(from,1)[0])
    this.sort(items, to)
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
    const {authUser} = this.props
    const {data, isLoading} = this.state
    let listItems = 'There is nothing to show'

    if (!isLoading && ((data.eat.length && (data.mode === 'eat')) || (data.drink.length && (data.mode === 'drink')))) {
      let myList = []
      if (data.mode === 'eat') {
        myList=this.state.data.eat
      } else {
        myList=this.state.data.drink
      }
      listItems = myList.map((item, i) => {
        if(authUser) {
          return (
            <div
              data-id={i}
              key={i}
              id={item.objectID}
              draggable='true'
              onDragEnd={this.dragEnd}
              onDragOver={this.dragOver}
              onDragStart={this.dragStart}
            >
              <button
                onClick={() => this.onDismiss(item.objectID, data.mode)}
                type='button'
              >
                Dismiss
              </button>
              <MenuListItem item={item}/>
            </div>
          )
        } return (
          <div
            data-id={i}
            key={i}
          >
            <MenuListItem item={item}/>
          </div>
        )

      })

    }

    return (
      <div>
        {authUser && <NewMenuItemForm onNewMenuItemCreation={this.handleAddingNewMenuItemToList}/>}
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
        <button
          className="w3-btn w3-teal"
          onClick={() => this.onSave()}
          type='button'
        >Save All</button>
      </div>
    )
  }
}

const MenuListItem = ({item}) =>
  <div>
    <h5>{item.title}</h5>
    <p className='w3-text-grey'>{item.desc}{' '}{item.price}</p>
  </div>

const Loading = () =>
  <div>Loading ...</div>

export default MenuList
