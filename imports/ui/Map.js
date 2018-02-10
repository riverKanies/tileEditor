import React, { Component } from 'react';
 
// Task component - represents a single todo item
export default class Map extends Component {
  constructor(props) {
    super(props)

    this.selectMap = this.selectMap.bind(this)
  }
  render() {
    return (
      <li onClick={this.selectMap} >{this.props.map.text}-{this.props.map._id.slice(0,4)}</li>
    );
  }
  selectMap(){
    this.props.ss({map: this.props.map})
  }
}