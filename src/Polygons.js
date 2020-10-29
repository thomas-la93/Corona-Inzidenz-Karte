import React, {useMemo} from 'react'
import {Polygon} from '@react-google-maps/api';


export default function Polygons({dataa, coord, selected, setCoor, setSelected}) {

  function inzidenzFarbe(num){
    switch(Boolean(num)){
      case num>100:
        return '#000';
      case num>70:
        return '#871A03';
      case num>50:
        return '#C83B1D';
      case num>35:
        return '#D87E6B';
      case num>25:
        return '#E8B1A5';
      case num>12:
        return '#ECCDC6';
      default:
        return '#FEFDFD'
    }
  }

  const countys = useMemo(()=> {
      return dataa.map((city, i) => 
       (
        <Polygon
          key={city.attributes.OBJECTID}
          paths = {coord[i]}
          onClick={(e) => {
            setCoor(null)
            const att = city.attributes
            setSelected({
              att,
              lat: e.latLng.lat(),
              lng: e.latLng.lng()
            })
          }}
          options={{
            zindex: 0,
            fillColor: inzidenzFarbe(city.attributes.cases7_per_100k),
            fillOpacity: (selected ? (selected.att.OBJECTID === city.attributes.OBJECTID ? 1 : 0.6 ) : 0.6),
            strokeColor: (selected ? (selected.att.OBJECTID === city.attributes.OBJECTID ? '#1505DE' : '#000' ) : '#000'),
            strokeOpacity: (selected ? (selected.att.OBJECTID === city.attributes.OBJECTID ? 1 : 0.5 ) : 0.5),
            strokeWeight: (selected ? (selected.att.OBJECTID === city.attributes.OBJECTID ? 3 : 0.6 ) : 0.6),
          }}
        />
      )
  )}, [dataa, coord, selected])

    return (
      <div>
        {countys}
      </div>
    )
}
