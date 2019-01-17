import React from 'react'
//import './App.css';
import { Map as LeafletMap, TileLayer, Marker, Popup,GeoJSON } from 'react-leaflet';


const center = [19.7515, 75.7139]

class Maplet extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            test_query : []
        }
    }
  
   
    


onEachFeature(feature, layer) {

    if (feature.properties && feature.properties.geometrey) {

    layer.bindPopup( '<h1>'+feature.properties.id+'</h1><p>NAME: '+feature.properties.NAME+'</p>');
  }
}






  render() {
    

    return (
        <div className="leaflet-container">
      <LeafletMap
        center={center}
        zoom={6}
        maxZoom={12}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        
          <Marker position={center}
          >
          <Popup >
          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
        
      
        
        <GeoJSON
          key={'test_query.features'}
        data={this.state.test_query} 
        onEachFeature={this.onEachFeature.bind(this)}
        style={() => ({
            color: '#4a83ec',
            weight: 0.5,
            fillColor: "#1a1d62",
            fillOpacity: 1,
          })}
        />
      </LeafletMap>
      </div>
    );
  }
}





export default Maplet;