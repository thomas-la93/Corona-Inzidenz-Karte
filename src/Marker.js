import React from 'react'
import {Marker} from '@react-google-maps/api';
import {isPointInPolygon} from 'geolib'


export default function CoronaMarker({setSelected, coor, dataa, coord}) {
  const posChange =  () => {  
    coord.find((choord, i) => choord.find(coort => {
      if(isPointInPolygon(coor, coort)){
        const att = dataa[i].attributes
        setSelected({att})
      } 
    })) 
  }

  return (
    <div>
      {coor ? (
      <Marker
        icon={{
          url: require("./corona2.png"),
          className: 'corona',
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
          scaledSize: new window.google.maps.Size(30, 30),
        }}
        position={coor}
        onPositionChanged={posChange}
        />
      ) : null }
    </div>
  )
}
