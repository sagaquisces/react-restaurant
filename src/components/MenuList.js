import React, { Component } from 'react'

const data = {
  colors: [
    "Gold",
    "Crimson",
    "Hotpink",
    "Blueviolet",
    "Cornflowerblue",
    "Skyblue",
    "Aquamarine",
    "Burlywood"
  ],
  textures: [
    "Fuzzy",
    "Wuzzy",
    "Velvety",
    "Overheated",
    "Cornye",
    "Feted",
    "Smooth",
    "Cold"
  ],
  mode: 'colors'
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
    if(mode==='colors') {
      data.colors = list
    } else {
      data.textures = list
    }
    data.dragging = dragging
    this.setState({...data})
  }

  dragEnd = () => {
    let mode = this.state.data.mode
    if(mode==='colors') {
      this.sort(this.state.data.colors, undefined)
    } else {
      this.sort(this.state.data.textures, undefined)
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
    if(mode==='colors') {
      items=this.state.data.colors
    } else {
      items=this.state.data.textures
    }
    items.splice(to, 0, items.splice(from,1)[0])
    this.sort(items, to)
  }

  render() {
    let mode = this.state.data.mode
    let myList = []
    if (mode === 'colors') {
      myList=this.state.data.colors
    } else {
      myList=this.state.data.textures
    }
    const listItems = myList.map((item, i) =>
      <li
        data-id={i}
        key={i}
        draggable='true'
        onDragEnd={this.dragEnd}
        onDragOver={this.dragOver}
        onDragStart={this.dragStart}
      >
        {item}
      </li>
    )
    return (
      <ol>{listItems}</ol>
    )
  }
}

export default MenuList
