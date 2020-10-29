import React, {useEffect, useState, useMemo} from 'react'
import { GoogleMap, LoadScript} from '@react-google-maps/api';
import mapStyles from './mapStyles'
import './styles.css'
import LocationSearchInput from './Autocomplete'
import CoronaMarker from './Marker';
import InfoWindow from './InfoWindow';
import Locate from './Locate';
import Polygons from './Polygons';

const lib = ["places", "geometry"]

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

const mapsOptions= {
        mapTypeControl: false,
        styles: mapStyles,
        streetViewControl: false,
        restriction: {
          latLngBounds: GERMANY_BOUNDS,
          strictBounds: false,
        },
      }

const url = `https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`

function MyComponent() {

  const [dataa, setDataa] = useState([]);
  const [selected, setSelected] = useState(null)
  const [coor, setCoor] = useState();

  async function fetchDataa() {
    const res = await fetch(url)
    res
    .json()
    .then(res => setDataa(res.features))
    .catch(err => console.log(err))   
  }  
        
  useEffect(() => {
      fetchDataa();
  }, []);
  
   const coord = useMemo(()=>{
     return dataa.map(city =>{
     return city.geometry.rings.map(ring => 
      ring.map(arr => ({
        lat: arr[1],
        lng: arr[0]
      }))
      )
    })}, [dataa])

  return (
  <LoadScript
    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} 
    libraries={lib}
    >
      
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coor ? coor : (selected ? {lat: selected.lat, lng: selected.lng} : center)}
      zoom={5}
      onClick={() => {
        setSelected(null)
        setCoor(null)
      }}
      options={mapsOptions}
      >

      <Locate setCoor={setCoor} />
      <LocationSearchInput setCoor={setCoor} />
      <CoronaMarker setSelected={setSelected} coor={coor} dataa={dataa} coord={coord}/>
      <InfoWindow selected={selected} />
      <Polygons dataa={dataa} coord={coord} selected={selected} setCoor={setCoor} setSelected={setSelected} />

    </GoogleMap>
  </LoadScript>
  )
}

export default React.memo(MyComponent)