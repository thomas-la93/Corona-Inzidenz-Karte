

Es ist ein Google API Key erforderlich für folgende Google Dienste:

Places API
Maps JavaScript API
Geocoding API

https://developers.google.com/maps/documentation/javascript/get-api-key

Den Key in eine .env.local Datei einfügen oder direkt in GoogleMaps.js an folgender stelle

<LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}  
        libraries={lib}
      >