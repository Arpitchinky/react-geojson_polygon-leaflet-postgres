
import React, { Component } from 'react'
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet'
const { BaseLayer, Overlay } = LayersControl

const center = [19.7515, 75.7139]
const rectangle = [[21.146633, 79.088860], [21.146633, 79.088860]]

export default class LayersControlExample extends Component {
    constructor(props) {
        super(props);
        this.state ={
            test_query : []
        }
    }
    componentDidMount(){
        fetch('/data')
        .then(res => res.json())
        .then(test_query => this.setState({test_query}, () => console.log('test fetched..',test_query.features)))
    }

  render() {
    return (
      <Map center={center} zoom={13}>
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <Overlay name="Marker with popup">
            <Marker position={center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Overlay>
          <Overlay checked name="Layer group with circles">
            <LayerGroup>
              <Circle center={center} fillColor="blue" radius={200} />
              <Circle
                center={center}
                fillColor="red"
                radius={100}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={[19.7515, 75.7139]}
                  color="green"
                  fillColor="green"
                  radius={100}
                />
              </LayerGroup>
            </LayerGroup>
          </Overlay>
          <Overlay name="Feature group">
            <FeatureGroup color="purple">
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[21.146633, 79.088860]} radius={200} />
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </Overlay>
        </LayersControl>
      </Map>
    )
  }
}