import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Maps } from '../api/maps.js';
 
import Map from './Map.js';

const tileSize = 30
const gameWidth = 24
const gameHeight = 14
const vb = [0, 0, gameWidth*tileSize, gameHeight*tileSize]
 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.createMap = this.createMap.bind(this)
  }

  renderMaps() {
    return this.props.maps.map((map) => (
      <Map key={map._id} map={map} ss={this.setState.bind(this)} />
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
            <div style={{background: 'black', color: 'white'}}>map editor
              {this.renderMap()}
            </div>
          </div>
        </div>

      </div>
    );
  }

  renderMap() {
    const { map } = this.state
    if (!map) return ''
    console.log(map)
    return <svg viewBox={vb.join(' ')} width='100%'>
      {map.level.map((row, i)=>{
        return row.map((cell, j)=>{
          return <g key={i+'-'+j}>
            {/* <rect  */}
          </g>
        })
      })}
    </svg>
  }

  createMap() {
    const map = {
      text: "Hello map", level: [[1,2],[3,4]], createdAt: new Date()
    }
    Meteor.call('maps.insert', map)
  }
}

export default withTracker(() => {
    return {
      maps: Maps.find({}).fetch(),
    };
})(App);