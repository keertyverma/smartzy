import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import AddDeviceType from "./components/add-device-type.component";
import PairDevice from "./components/pair-device.component";
import AllPairedDevice from "./components/smart-paired-device-list.component";
import EditPairDevice from "./components/edit-pair-device.component";
import SupportedDevice from './components/supported-device-list.component';
import EditDeviceType from './components/edit-device-type.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/device-type" component={AddDeviceType} />
        <Route path="/pair-device" component={PairDevice} />
        <Route path="/smart-devices" component={AllPairedDevice} />
        <Route path="/update-pair-device/:id" component={EditPairDevice} />
        <Route path="/supported-devices" component={SupportedDevice} />
        <Route path="/update-device/:id" component={EditDeviceType} />
      </div>
    </Router >
  );
}


export default App;
