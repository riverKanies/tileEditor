import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Maps } from '../api/maps.js';
 
import Map from './Map.js';
 
// App component - represents the whole app
class App extends Component {
  renderMaps() {
    return this.props.maps.map((map) => (
      <Map key={map._id} map={map} />
    ));
  }
  getMaps() {
    return [
      { _id: 1, text: 'This is map 1' },
      { _id: 2, text: 'This is map 2' },
      { _id: 3, text: 'This is map 3' },
    ];
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
 
        <ul>
          {this.renderMaps()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
    return {
      maps: Maps.find({}).fetch(),
    };
})(App);