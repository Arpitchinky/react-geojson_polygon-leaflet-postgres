import React, { Component } from 'react';

import './App.css';


import MapApp from './Components/leaflet';




class App extends Component {
  render() {
    return (
      <div className="App">
       
       <h2> Welcome to react js File </h2>

     <MapApp/>

      
      </div>
    );
  }
}

export default App;
