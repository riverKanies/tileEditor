import React, { Component } from 'react';
 
// Task component - represents a single todo item
export default class Map extends Component {
  render() {
    return (
      <li>{this.props.map.text}</li>
    );
  }
}