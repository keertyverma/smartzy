import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PairedDevice = props => (
    <tr>
        <td>{props.pairdevice._id}</td>
        <td>{props.pairdevice.name}</td>
        <td>{props.pairdevice.type}</td>
        <td>
            <Link to={"/update-pair-device/" + props.pairdevice._id}>update</Link> | <a href="/smart-devices" onClick={() => { props.deletePairDevice(props.pairdevice._id) }}>delete</a>
        </td>
    </tr>
)


export default class AllPairedDevice extends Component {
    constructor(props) {
        super(props)

        this.deletePairDevice = this.deletePairDevice.bind(this);

        this.state = {
            pairedDevices: []
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

    deletePairDevice(id) {
        axios.delete('http://localhost:5000/api/v1/device/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            pairedDevices: this.state.pairedDevices.filter(pd => pd._id !== id)
        })
    }

    pairedDeviceList() {
        return this.state.pairedDevices.map(pairdevice => {
            return <PairedDevice pairdevice={pairdevice} deletePairDevice={this.deletePairDevice} key={pairdevice._id} />;
        })
    }


    render() {
        return (
            <div>
                <h3>List of Paired Smart Devices</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Device ID</th>
                            <th>Name</th>
                            <th>Device Type</th>
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
