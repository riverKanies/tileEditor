import React, { Component } from 'react';
 
// Task component - represents a single todo item
export default class Map extends Component {
  constructor(props) {
    super(props)

    this.selectMap = this.selectMap.bind(this)
    this.rename = this.rename.bind(this)
  }
  render() {
    let style = {margin: '10px 0'}
    if (this.props.selected) style.border = '2px solid blue'
    return (
      <li onClick={this.selectMap} >
        <input value={this.props.map.text} onChange={this.rename} style={style}/>
      </li>
    );
  }
  selectMap(){
    console.log('map', this.props.mapIndex)
    this.props.ss({selectedMap: this.props.mapIndex})
  }
  rename(e) {
    Meteor.call('maps.update', {...this.props.map, text: e.target.value})
  }
}