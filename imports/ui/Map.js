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
      'delete',
      'simulate'
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
        <button onClick={this.simulate}>[sim]</button>
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
  simulate() {
    const {map} = this.props
    const height = map.level.length
    const width = map.level[0].length
    const dirs = ['u','d','l','r']

    let bird = {x:0, y:0}
    let wormCount = 0
    for (let i=1;i<height-2;i++) {
      for (let j=1;j<width-2;j++) {
        const tile = map.level[i][j]
        if (tile == 'bird') {
          bird.y = i
          bird.x = j
          map.level[i][j] = 'ee'
        }
        if (tile.slice(0,1) == 'w') {
          //map.level[i][j] = 'ee'
          wormCount++
        }
      }
    }
    function move(pos,dx,dy) {
      const x = pos.x+dx
      const y = pos.y+dy
      let worms = pos.worms.map(w=>w)
      const nextTile = map.level[y][x]
      const isWorm = nextTile.slice(0,1) == 'w'
      if (nextTile == 'ee' || isWorm) {
        if (isWorm) {
          const old = worms.find((w)=>{
            return w.x == x && w.y == y
          })
          if (!old) {
            worms.push({x,y})
            if (worms.length == wormCount) console.log('solved!',pos.path)
          }
        }
        return move({x,y,worms,path:pos.path},dx,dy)
      }
      return pos
    }
    function makePath(pos,dir) {
      let dx = 0
      let dy = 0
      if (dir == 'u') dy = -1
      if (dir == 'd') dy = 1
      if (dir == 'l') dx = -1
      if (dir == 'r') dx = 1
      let path = pos.path.map(m=>m)
      path.push(dir)
      const newPos = move({...pos,path},dx,dy)
      if (newPos.x == pos.x && newPos.y == pos.y) return null
      return newPos
    }

    function makeBranch (pos) {
      const branch = {}
      dirs.forEach((d)=>{
        branch[d] = makePath(pos,d)
      })
      return branch
    }

    function makeBranches (branch,layers) {
      dirs.forEach(d=>{
        if(branch[d]) {
          branch[d].branch = makeBranch(branch[d])
          if (layers > 1) branch[d].branch = makeBranches(branch[d].branch,layers-1)
        }
      })
      return branch
    }

    function makeTree (pos,layers) {
      const tree = makeBranch(pos)
      return makeBranches(tree,layers-1)
    }

    const startingPos = {...bird,worms:[],path:[]}
    //const newPos = makePath(startingPos,'r')
    //const branch = makeBranch(startingPos)
    const tree = makeTree(startingPos,5)

    console.log('simulating',tree)
  }
}