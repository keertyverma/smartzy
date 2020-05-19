import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Device = props => (
    <tr>
        <td>{props.device._id}</td>
        <td>{props.device.action}</td>
        <td>
            <Link to={"/update-device/" + props.device._id}>update</Link> | <a href="/supported-devices" onClick={() => { props.deleteDevice(props.device._id) }}>delete</a>
        </td>
    </tr>
)


export default class SupportedDevice extends Component {
    constructor(props) {
        super(props)

        this.deleteDevice = this.deleteDevice.bind(this);

        this.state = {
            supportedDevices: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/v1/devicetype')
            .then(response => {
                this.setState({ supportedDevices: response.data.details })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteDevice(id) {
        axios.delete('http://localhost:5000/api/v1/devicetype/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            supportedDevices: this.state.supportedDevices.filter(sd => sd._id !== id)
        })
    }

    supportedDeviceList() {
        return this.state.supportedDevices.map(device => {
            console.log(device)
            return <Device device={device} deleteDevice={this.deleteDevice} key={device._id} />;
        })
    }


    render() {
        return (
            <div>
                <h3>List of Supported Smart Devices</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Device Type</th>
                            <th>Actions</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.supportedDeviceList()}
                    </tbody>
                </table>
            </div>
        )
    }

}
