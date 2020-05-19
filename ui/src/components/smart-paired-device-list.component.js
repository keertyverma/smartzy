import React, { Component } from 'react';
import axios from 'axios';
import PairedDevice from "./single-paired-device.component";
import { Link } from 'react-router-dom';


export default class AllPairedDevice extends Component {
    constructor(props) {
        super(props)

        this.deletePairDevice = this.deletePairDevice.bind(this);
        this.getAction = this.getAction.bind(this);

        this.state = {
            pairedDevices: [],
            deviceTypes: {}
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/v1/device')
            .then(response => {
                this.setState({ pairedDevices: response.data.details })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getAction(deviceType) {
        if (deviceType in this.state.deviceTypes) {
            return
        }
        axios.get('http://localhost:5000/api/v1/devicetype/' + deviceType)
            .then(response => {
                this.setState((state) => {
                    const deviceTypes = state.deviceTypes;
                    deviceTypes[deviceType] = response.data.details.action;
                    return {
                        deviceTypes: deviceTypes
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deletePairDevice(id) {
        axios.delete('http://localhost:5000/api/v1/device/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            pairedDevices: this.state.pairedDevices.filter(pd => pd._id !== id)
        })
    }

    pairedDeviceList() {
        return this.state.pairedDevices.map(pairdevice => {
            return <PairedDevice pairdevice={pairdevice} deletePairDevice={this.deletePairDevice} getAction={this.getAction} key={pairdevice._id} actions={this.state.deviceTypes[pairdevice.type] || []} />;
        })
    }


    render() {
        return (
            <div>
                <h3>List of Paired Smart Devices</h3>
                <Link to="/pair-device" className="btn btn-info mb-4">Pair Smart Devices</Link>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Device ID</th>
                            <th>Name</th>
                            <th>Device Type</th>
                            <th>Perform Action</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.pairedDeviceList()}
                    </tbody>
                </table>
            </div>
        )
    }

}
