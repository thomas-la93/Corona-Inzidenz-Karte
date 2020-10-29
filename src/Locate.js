import React from 'react'

export default function Locate({setCoor}) {

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
        <button className="locatebutton" type='submit' onClick={locate}><img src={require("./gps.png")} alt="compass" /></button>   
    )
}
