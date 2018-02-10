import React, { Component } from 'react';
 
// Task component - represents a single todo item
export default class Map extends Component {
  constructor(props) {
    super(props)

    this.selectMap = this.selectMap.bind(this)
  }
  render() {
    return (
      <li onClick={this.selectMap} style={this.props.selected ? {border: '2px solid blue'} : {} }>{this.props.map.text}-{this.props.map._id.slice(0,4)}</li>
    );
  }
  selectMap(){
    console.log('map', this.props.mapIndex)
    this.props.ss({selectedMap: this.props.mapIndex})
  }
}