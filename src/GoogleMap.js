import React, {useEffect, useRef, useState} from 'react'
import {isPointInPolygon} from 'geolib'
import { GoogleMap, LoadScript, Polygon, Marker, Autocomplete} from '@react-google-maps/api';
import mapStyles from './mapStyles'
import './styles.css'

const lib = ["places", "geometry"]
const country = {country: 'DE'}

const containerStyle = {
  width: '100wh',
  height: '100vh'
};

const center = {
    lat: 51.08342, 
    lng: 10.42345
};

const GERMANY_BOUNDS = {
  north: 56.05,
  south: 46.270108,
  west:  4.866667,
  east: 16.033333,
};

function inzidenzFarbe(num){
  switch(true){
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

const url = `https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`

function MyComponent() {

  const [hasError, setErrors] = useState(false);
  const [dataa, setDataa] = useState([]);
  const [selected, setSelected] = useState()
  const [searchBox, setSearchBox] = useState();
  const [coor, setCoor] = useState();

  const coord = useRef()

  async function fetchDataa() {
    const res = await fetch(url)
    res
    .json()
    .then(res => setDataa(res.features))
    .catch(err => setErrors(err));
    console.log(hasError ? 'Could not fetch data' : 'fetched Data')
  }  
        
  useEffect(() => {
      fetchDataa();
  }, []);

  coord.current = dataa.map(city =>
    city.geometry.rings.map(ring => 
      ring.map(arr => ({
        lat: arr[1],
        lng: arr[0]
      }))

    )
  )

  const countys = dataa.map((city, i) => {
    return (
      <Polygon
        key={city.attributes.OBJECTID}
        paths = {coord.current[i]}
        onClick={(e) => {
          const att = city.attributes
          setSelected({
            att,
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          })
          setCoor(null)
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
  })
 
  const posChange =  () => {
     for(let i=0; i<dataa.length; i++){
      let test =  coord.current[i].find(choord => isPointInPolygon(coor, choord))
      if(test){
        const att = dataa[i].attributes
          setSelected({att})
          break;
      } 
    }  
  }

  const autocom = ()=> {
    try{
      const koord={
        lat: searchBox.getPlace().geometry.location.lat(),
        lng: searchBox.getPlace().geometry.location.lng()
      }
      setCoor(koord)
    } catch (e) {
      console.log('autocom function: '+e)
    }
  }
  
  const locate = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const koord={
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      setCoor(koord)
    }, () => null)
  }

  return (
  <LoadScript
    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} 
    libraries={lib}
    >
          
    <button className="locatebutton" type='submit' onClick={locate}><img src={require("./gps.png")} alt="compass" /></button>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coor ? coor : (selected ? {lat: selected.lat, lng: selected.lng} : center)}
      zoom={5}
      onClick={(e) => {
        setSelected(null)
        setCoor(null)
      }}
      options={{
        mapTypeControl: false,
        styles: mapStyles,
        streetViewControl: false,
        restriction: {
          latLngBounds: GERMANY_BOUNDS,
          strictBounds: false,
        },
      }}
      >

      <Autocomplete
        onLoad={(e) => setSearchBox(e)}
        onPlaceChanged={autocom}
        restrictions={country}
        >
        <input
          type="text"
          className='search'
          placeholder="Search"
        />
      </Autocomplete>


      {countys}

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

      {selected ? (
        <div className="test">
          <div className="divStyle">
            <h3>{selected.att.county}</h3>
            <p>in Bearbeitung....</p>
            <h5>{Math.round(selected.att.cases7_per_100k*100)/100}</h5>
          </div>
        </div>
      ) : null }
    </GoogleMap>
  </LoadScript>
  )
}

export default React.memo(MyComponent)