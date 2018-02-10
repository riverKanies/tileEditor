import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Maps } from '../api/maps.js';
 
import Map from './Map.js';

const tileSize = 30
const gameWidth = 24
const gameHeight = 14
const vb = [0, 0, gameWidth*tileSize, gameHeight*tileSize]

const tiles = {
  't1': 'tile2.PNG'
}
 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.state.map=null
    this.state.selectedTile = 'ee'

    this.createMap = this.createMap.bind(this)
    this.selectTile = this.selectTile.bind(this)
    this.setTile = this.setTile.bind(this)
  }
  componentDidMount() {
    setTimeout(()=>{
      if (!this.state.map && this.props.maps) this.setState({map: this.props.maps[0]})
    }, 500)
  }

  renderMaps() {
    const sm = this.state.map
    return this.props.maps.map((map) => (
      <Map key={map._id} map={map} ss={this.setState.bind(this)} selected={(sm && map._id == sm._id)} />
    ));
  }
 
  render() {
    return (
      <div>
        <header>
          <h3>Maps</h3>
        </header>

        <div className='row'  style={{width: '100%', margin: '0'}}>
          <div className='col-xs-3' >
            <div onClick={this.createMap}>New Map</div>
            <ul style={{background: 'lightgray'}}>
              {this.renderMaps()}
            </ul>
          </div>
          <div className='col-xs-9' >
            <div>
              {this.renderTileSelect()}
            </div>
            <div style={{background: 'black', color: 'white'}}>
              {this.renderMap()}
            </div>
          </div>
        </div>

      </div>
    );
  }

  renderTileSelect() {
    let selectables = [<svg key='ee' onClick={this.selectTile('ee')} viewBox='0 0 30 30' style={{width: '100%', background: 'black', border: (this.state.selectedTile == 'ee' ? '3px solid blue':'')}}></svg>]
    for (let key in tiles) {
      selectables.push(<img key={key} onClick={this.selectTile(key)} src={tiles[key]} style={{width: '100%', border: (this.state.selectedTile == key ? '3px solid blue':'')}}/>)
    }
    return <div className='row' style={{background: 'gray', padding: '20px'}}>
      {selectables.map((s,i)=>(<div key={i} className='col-xs-2' >{s}</div>))}
    </div>
  }

  renderMap() {
    const map = this.state.map
    if (!map) return ''
    return <svg viewBox={vb.join(' ')} width='100%'>
      {map.level.map((row, rI)=>{
        return row.map((cell, cI)=>{
          return <g onClick={this.setTile(rI,cI)} key={rI+'-'+cI} transform={`translate(${cI*tileSize},${rI*tileSize})`}>
            {this.renderTile(cell)}
          </g>
        })
      })}
    </svg>
  }
  renderTile(cell) {
    if (cell == 'ee') return <rect width={tileSize} height={tileSize} stroke={'white'}/>
    return <image href={tiles[cell]} />
  }

  createMap() {
    const map = {
      text: "map", level: [], createdAt: new Date()
    }
    for (let rI = 0; rI<14; rI++) {
      map.level[rI] = []
      for (let cI = 0; cI<24; cI++) {
        map.level[rI][cI] = 'ee'
      }
    }
    map.level[7][12] = 't1'

    Meteor.call('maps.insert', map)
  }

  selectTile(t) {
    return ()=>{
      this.setState({selectedTile: t})
    }
  }
  setTile(rI,cI) {
    return ()=>{
      this.state.map.level[rI][cI] = this.state.selectedTile
      this.setState({})
    }
  }
}

export default withTracker(() => {
    return {
      maps: Maps.find({}).fetch(),
    };
})(App);