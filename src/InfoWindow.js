import React,{useState} from 'react'
import gesetze from'./Gesetze'
import './InfoWindow.css'

export default function InfoWindow({selected, checkbox}) {

  const[active, setActive] = useState(false)
  const findGesetze = (bundesland) => {
      const bl = gesetze.find(bl => bl.BL===bundesland)
      return bl
  }
  const toggle = () => {
    setActive(!active)
  }


  let area
  let area2
  let area3
  if(checkbox && selected){
    area = selected.att.LAN_ew_GEN
    area2 = selected.att.LAN_ew_GEN
    area3 = selected.att.cases7_bl_per_100k
  } if(!checkbox && selected) {
    area = selected.att.county
    area2 = selected.att.BL
    area3 = selected.att.cases7_per_100k
  }


  return (
      <div>
        {active ? 
          <button className="test" onClick={toggle}>show</button>
        : null}
      {selected ? (
      <div className='test' onClick={toggle} >
        <div className={active ? "div-active": "divStyle"}>
          <h3>{area}</h3>
          <p>{findGesetze(area2).info}</p>
          <h6>7 Tage Inzidenz: {Math.round(area3*100)/100}</h6>
        </div>
      </div>
    ) : null }
      </div>
  )
}

