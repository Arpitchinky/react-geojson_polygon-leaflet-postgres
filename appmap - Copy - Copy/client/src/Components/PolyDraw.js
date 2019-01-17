import React, { Component } from 'react';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import  turf from '@turf/turf';

import mapboxgl from 'mapbox-gl';
import './DottedBox.css';


mapboxgl.accessToken = 'pk.eyJ1IjoiYXJwaXQxMzA0IiwiYSI6ImNqcDk5bm85bTIxc2wzcXBlYmo2ZXowODMifQ.FkrJWIMJDkt_DAEIQMeLnw';
/* eslint-disable */





class DrawMap extends Component {
    componentDidMount() {

        var map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/satellite-v9', //hosted style id
            center: [ 78.4867, 17.3850], // starting position
            zoom: 12 // starting zoom
        });
        
        var draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            }
        });
        map.addControl(draw);
        
        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);
        
        function updateArea(e) {
            var data = draw.getAll();
            var answer = document.getElementById('calculated-area');
            if (data.features.length > 0) {
                var area = turf.area(data);
                // restrict to area to 2 decimal points
                var rounded_area = Math.round(area*100)/100;
                answer.innerHTML = '<p><strong>' + rounded_area + '</strong></p><p>square meters</p>';
            } else {
                answer.innerHTML = '';
                if (e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
            }
        }
        


    }

   

    
   
   
    render() { 
        return ( 
            <div>
           <div id='map'></div>
           <div className='calculation-box'>
    <p>Draw a polygon using the draw tools.</p>
    <div id='calculated-area'></div>
</div>

</div>
         );
    }
}
 
export default DrawMap;