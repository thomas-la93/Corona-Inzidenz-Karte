import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import MyComponent from "./GoogleMap";

function App() {
 
  return (
    <Router>
      <div>
        <Switch>
        <Route path="/" exact component={MyComponent}/>
        </Switch>
      </div>
    </Router>
    // <div>
    // <Suchmaske />
    // <hr />
    // <Citynews />
    // </div>
  );
};
  

export default App;
