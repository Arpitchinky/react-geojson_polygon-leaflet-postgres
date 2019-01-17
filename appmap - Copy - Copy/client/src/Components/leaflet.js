import React from 'react';
import L from 'leaflet';

//Decleare the Globle Variable 
var testmap=[];
var map;
//Use this function in make the whole map in react js 
function Map_geojson() {

    map = L.map('map').setView([18.4339230205526, 77.3208450000667], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// this style use in polygon map in react js 
         var myStyle = {
         "color": '#800026',
         "weight": 5,
         "opacity": 0.65
     };
     //All polygon show the map using GEOJSON Data 
    
        // var geoJsonLayer = 
         L.geoJSON(testmap.features, {
         style: myStyle,
         //onEach feature use the importent in proprities system 
               
           onEachFeature: function( feature, layer) {
               //Popup use the sho the text id=?, And Village Name =?
               layer.on('mouseover', function () {
                 this.setStyle({
                   'fillColor': '#0000ff'
                 });
               });
               layer.on('mouseout', function () {
                 this.setStyle({
                   'fillColor': '#ff0000'
                 });
            })
             layer.on('click', function () {
                 // Let's say you've got a property called url in your geojsonfeature:
                 window.location = feature.properties.f1;
               });
    
             var popupText = 'id: <b>' + feature.properties.f1 + '</b>' + '<br/>NAME: <b>' + feature.properties.f2 + '</b>';
             layer.bindPopup(popupText);
           },
         //All variabale  are Add to this map 
        }).addTo(map)}

class MapApp extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            test_query: [],
            lat: 19.7515 ,
            lng: 75.7139,
            zoom: 10,
            open: false,
           deta: [],
          test:[], 
          testmap:[]
           }

      }

     //Submit button Data
      handleSubmit(event) {
           alert('Your favorite Village is: ' + this.state.deta );
          event.preventDefault();
      }

         //Taluka Click----------

    handleClick(){
     var id=this.refs.id.value;
     //console.log( `Taluka name`,id);
    
     fetch(`/upto/${id}`)
   .then(res => res.json())
    .then(deta => this.setState({deta}, () =>{
   // console.log('deta fetched...', deta);
 }));
 fetch(`/mapTalukaPolygons/${id}`)
   
 .then(res => res.json())
  .then(testmap => this.setState({testmap}, () =>{
    console.log('testmap fetched...', testmap);
    console.log('testmap fetched...', map);
  
  L.geoJSON(testmap.features).addTo(map)
 }));

 
}
    //Village Click--------- 

    handleChange(){
      var name=this.refs.name.value;
      console.log( ` Village name`,name);
      
  fetch(`/Done/:${name}`)
  .then(res => res.json())
  .then(done => this.setState({done}, () =>{
  console.log('done fetched...', done);
}));
 }


 componentDidMount(){
      // All Village data in------ Router 
      fetch('/add')
      .then(res => res.json())
      .then(deta => this.setState({deta}, () =>{
     // console.log('deta fetched...', deta)
    }));

     // All Taluka Data in ---- Router 
     fetch('/taluka')
     .then(res => res.json())
     .then(test => this.setState({test}, () =>{
    // console.log('deta fetched...', test)
   }));
 // All Polygon Data in test_query------
  
        fetch('/data')
        .then(res => res.json())
        .then(test_query => this.setState({test_query}, () =>{
         //console.log('test fetched..',test_query.features);
      })); 

    // pass this function Upload the map in react js 
       Map_geojson();
    
     };

  render() {
  let stateOptions = this.state.deta.map(deta => { 
    return <option key={deta.id} value={deta.NAME}>{deta.NAME} </option>});
    
    let stateOpt = this.state.test.map(test => { 
    return <option key={test.Taluk} value={test.Taluk}>{test.Taluk} </option>});
 
       return (
           <div>
       <div id="map"></div>
      <div className="container" style={{color: 'red', marginTop: '5px'}}>
            <form>
        <label>

          {/* this is the  select Taluka  in dropdown  */}

           Pick your favorite  Taluka:
         <select ref='id' onChange={this.handleClick.bind(this)}>  
            {stateOpt } 
            </select>

            {/* This is the select Village dropdown   */}

         Pick your favorite  Village:
         <select ref='name' onChange={this.handleChange.bind(this)}  >   
          {stateOptions} 
        </select>
     </label>

        <input type="submit" value="Submit" />
     </form>
 </div>
  </div>
    )}
   };
 
export default MapApp;