import React, {
  useEffect,
  useState,
  useMemo,
} from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import LocationSearchInput from "./LocationSearchInput";
import CoronaMarker from "./Marker";
import InfoWindow from "./InfoWindow";
import Locate from "./Locate";
import Polygons from "./Polygons";
import Radio from "./Radio";
import "./GoogleMap.css";

const lib = ["places", "geometry"];

const containerStyle = {
  width: "100wh",
  height: "100vh",
};

const center = {
  lat: 51.08342,
  lng: 10.42345,
};

const GERMANY_BOUNDS = {
  north: 56.05,
  south: 46.270108,
  west: 4.866667,
  east: 16.033333,
};

const mapsOptions = {
  mapTypeControl: false,
  styles: mapStyles,
  streetViewControl: false,
  restriction: {
    latLngBounds: GERMANY_BOUNDS,
    strictBounds: false,
  },
};

const urlLk = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
const urlBl = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/Coronaf%C3%A4lle_in_den_Bundesl%C3%A4ndern/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";

function MyComponent() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [coor, setCoor] = useState();
  const [checkbox, setCheckbox] = useState(false);

  async function fetchData() {
    const res = await fetch(check());
    res
      .json()
      .then((res) => setData(res.features))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, [checkbox]);

  const check = () => {
    if (checkbox) {
      return urlBl;
    } else {
      return urlLk;
    }
  };
  const coord = useMemo(
    () =>
      data.map((obj) =>
        obj.geometry.rings.map((ring) =>
          ring.map((arr) => ({
            lat: arr[1],
            lng: arr[0],
          }))
        )
      ),
    [data]
  );

  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={lib}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            coor
              ? coor
              : selected
              ? { lat: selected.lat, lng: selected.lng }
              : center
          }
          zoom={5}
          onClick={() => {
            setSelected(null);
            setCoor(null);
          }}
          options={mapsOptions}
        >
          <Locate setCoor={setCoor} />
          <LocationSearchInput setCoor={setCoor} />
          <CoronaMarker
            setSelected={setSelected}
            coor={coor}
            data={data}
            coord={coord}
          />
          <InfoWindow selected={selected} checkbox={checkbox} />
          <Polygons
            data={data}
            coord={coord}
            selected={selected}
            setCoor={setCoor}
            setSelected={setSelected}
            checkbox={checkbox}
          />
          <Radio
            checkbox={checkbox}
            setCoor={setCoor}
            setSelected={setSelected}
            setCheckbox={setCheckbox}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(MyComponent);
