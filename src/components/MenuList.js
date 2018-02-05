import React, { Component } from 'react'

const data = {
  eat: [
    {title: 'Bread Basket', desc: 'Assortment of fresh baked fruit breads and muffins', price: '5.50'},
    {title: 'Honey Almond Granola with Fruits', desc: 'Natural cereal of honey toasted oats, raisins, almonds and dates', price: '7.00'},
    {title: 'Belgian Waffle', desc: 'Vanilla flavored batter with malted flour', price: '7.50'},
    {title: 'Scrambled eggs', desc: 'Scrambled eggs, roasted red pepper and garlic, with green onions', price: '7.50'},
    {title: 'Blueberry Pancakes', desc: 'With syrup, butter and lots of berries', price: '8.50'},
  ],
  drink: [
    {title: 'Coffee', desc: 'Regular coffee', price: '2.50'},
    {title: 'Chocolato', desc: 'Chocolate espresso with milk', price: '4.50'},
    {title: 'Corretto', desc: 'Whiskey and coffee', price: '5.00'},
    {title: 'Iced tea', desc: 'Hot tea, except not hot', price: '3.00'},
    {title: 'Soda', desc: 'Coke, Sprite, Fanta, etc.', price: '2.50'},
  ],
  mode: 'drink'
};


class MenuList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: data
    }
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

  render() {
    const {authUser} = this.props
    console.log(authUser)
    let mode = this.state.data.mode
    let myList = []
    if (mode === 'eat') {
      myList=this.state.data.eat
    } else {
      myList=this.state.data.drink
    }
    const listItems = myList.map((item, i) => {
      if(authUser) {
        return (
          <li
            data-id={i}
            key={i}
            draggable='true'
            onDragEnd={this.dragEnd}
            onDragOver={this.dragOver}
            onDragStart={this.dragStart}
          >
            <MenuListItem item={item}/>
          </li>
        )
      } return (
        <li
          data-id={i}
          key={i}
        >
          <MenuListItem item={item}/>
        </li>
      )

    })
    return (
      <ul>{listItems}</ul>
    )
  }
}

const MenuListItem = ({item}) =>
  <div>
    {item.title}{' '}{item.desc}{' '}{item.price}
  </div>

export default MenuList
