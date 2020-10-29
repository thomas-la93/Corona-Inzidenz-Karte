import React from 'react'
import gesetze from'./Gesetze'

export default function InfoWindow({selected}) {

    const findGesetz = (bundesland) => {
        const bl = gesetze.find(bl => bl.BL===bundesland)
        console.log(bl)
    }

    return (
        <div>
        {selected ? (
        <div className="test">
          <div className="divStyle">
            <h3>{selected.att.county}</h3>
            <p>{findGesetz(selected.att.BL)}in Bearbeitung....</p>
            <h5>{Math.round(selected.att.cases7_per_100k*100)/100}</h5>
          </div>
        </div>
      ) : null }
        </div>
    )
}
