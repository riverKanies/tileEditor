import React, { Component } from 'react';

const bindAll = (a, that) => {
  a.forEach((f)=>{
    that[f] = that[f].bind(that)
  })
}
 
// Task component - represents a single todo item
export default class Map extends Component {
  constructor(props) {
    super(props)

    this.selectMap = this.selectMap.bind(this)
    this.rename = this.rename.bind(this)
    this.copy = this.copy.bind(this)
    this.duplicate = this.duplicate.bind(this)
    bindAll([
      'delete'
    ], this)
  }
  render() {
    const {map} = this.props
    let itemStyle = {padding: '5px', background: 'gray', marginBottom: '5px'}
    if (this.props.selected) {
      itemStyle.background = 'black'
    }
    return (
      <li onClick={this.selectMap} style={itemStyle}>
        <input value={map.text} onChange={this.rename} />
        <button onClick={this.duplicate}>Dup</button>
        <button onClick={this.copy}>Copy</button><input id={`copy-${map._id}`} style={{position: 'absolute', marginLeft: '110%'}} value={JSON.stringify(map.level)} onChange={()=>(null)} />
        <button onClick={this.delete}>X</button>
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
  duplicate () {
    const map = this.props.map
    delete map._id
    Meteor.call('maps.insert', map)
  }
  delete() {
    const map = this.props.map
    if (confirm(`WARNING: Delete ${map.text} ?`))  Meteor.call('maps.remove', map._id)
  }
}