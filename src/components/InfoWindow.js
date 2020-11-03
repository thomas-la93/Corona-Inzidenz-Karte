import React,{useState} from 'react'
import gesetze from'./Gesetze'
import './InfoWindow.css'

export default function InfoWindow({setSelected, setCoor, selected, checkbox}) {

  const[active, setActive] = useState(false)
  const findGesetze = (bundesland) => {
    const bl = gesetze.find(bl => bl.BL===bundesland)
    return bl
  }
  const toggle = () => {
    setActive(!active)
  }

  const close = () => {
    setSelected(null);
    setCoor(null);
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
        {active && selected ? 
          <img onClick={toggle} className="showimg show" alt="show" src={require("../assets/show.png")} />
        : null}
      {selected ? (
        <div className='test'  >
        <div className={active ? "div-active": "divStyle"}>
          <img onClick={toggle} className="hideimg" alt="hide" src={require("../assets/hide.png")} />
          <img onClick={close} className="closeimg" alt="close" src={require("../assets/close.png")} />
          <h3>{area}</h3>
          <a href={findGesetze(area2).url} rel="noopener noreferrer" target="_blank" >Mehr Infos</a>
          <h6>7 Tage Inzidenz: {Math.round(area3*100)/100}</h6>
        </div>
      </div>
    ) : null }
      </div>
  )
}

