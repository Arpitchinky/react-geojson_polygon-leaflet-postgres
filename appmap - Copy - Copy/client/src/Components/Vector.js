
import React, { Component } from 'react'
import { Map, Polygon, TileLayer , GeoJSON} from 'react-leaflet'
//import L from 'leaflet'


const  center = [51.505, -0.09]



const polygon = [[51.515, -0.09], [51.52, -0.1], [51.52, -0.12]]




export default class VectorLayersExample extends Component {constructor(props) {
  super(props);
  this.state ={
      test_query : []
  }
}
componentDidMount(){
  fetch('/data')
  .then(res => res.json())
  .then(test_query => this.setState({test_query}, () => console.log('test fetched..',test_query.features[0])))
}
  render() {
    
    return (
      <Map center={center} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       
         
       
       
        <Polygon color="purple" positions={polygon} />
        {/* <GeoJSON ref='polygon'  
        positions={states}
        style={() => ({
            color: '#4a83ec',
            weight: 0.5,
            fillColor: "#1a1d62",
            fillOpacity: 1,
          })}

         /> */}
        
       
      </Map>
    
    )
  }
}