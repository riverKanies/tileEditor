import React, { Component } from 'react';
 
// Task component - represents a single todo item
export default class Map extends Component {
  constructor(props) {
    super(props)

    this.selectMap = this.selectMap.bind(this)
    this.rename = this.rename.bind(this)
    this.copy = this.copy.bind(this)
  }
  render() {
    const {map} = this.props
    let style = {margin: '10px 0'}
    if (this.props.selected) style.border = '2px solid blue'
    return (
      <li onClick={this.selectMap} >
        <input value={map.text} onChange={this.rename} style={style}/>
        <button onClick={this.copy}>Copy</button>
        <input id={`copy-${map._id}`} style={{position: 'absolute', marginLeft: '110%'}} value={JSON.stringify(map.level)} />
      </li>
    );
  }
  selectMap(){
    this.props.ss({selectedMap: this.props.mapIndex})
  }
  rename(e) {
    Meteor.call('maps.update', {...this.props.map, text: e.target.value})
  }
  copy() {
    const el = document.getElementById(`copy-${this.props.map._id}`)
    if (!el) return
    el.select()
    document.execCommand("Copy")
  }
}