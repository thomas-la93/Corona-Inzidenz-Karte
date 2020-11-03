import React from "react";
import './Radio.css'

export default function Radio({ checkbox, setCheckbox, setCoor, setSelected }) {
  return (
    <div>
      <form
        className="checkb"
        onChange={() => {
          setSelected(null);
          setCoor(null);
          setCheckbox(!checkbox);
        }}
      >
        <div>
          <div id="img">
            <img
              src={require("../assets/corona2.png")}
              alt="corona"
              className="imgcheck"
              hidden={checkbox}
            />
          </div>
          <label id="gem">
            <input
              type="radio"
              className="radioin"
              value="option1"
              readOnly
              checked={!checkbox}
            />
            Landkreise
          </label>
          <div id="img">
            <img
              src={require("../assets/corona2.png")}
              alt="corona"
              className="imgcheck"
              hidden={!checkbox}
            />
          </div>
          <label id="bund">
            <input
              type="radio"
              className="radioin"
              value="option2"
              readOnly
              checked={checkbox}
            />
            Bundesländer
          </label>
        </div>
      </form>
    </div>
  );
}
