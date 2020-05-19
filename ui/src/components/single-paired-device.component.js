import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class PairedDevice extends Component {
    constructor(props) {
        super(props)

        this.performAction = this.performAction.bind(this);
    }

    performAction(deviceId, action) {
        axios.post(`http://localhost:5000/api/v1/device/${deviceId}/action`, { action })
            .then(res => alert(res.data.details.message))
            .catch((err) => alert(err.response.data.message));
    }
    render() {
        const props = this.props;
        return (
            <tr>
                <td>{props.pairdevice._id}</td>
                <td>{props.pairdevice.name}</td>
                <td>{props.pairdevice.type}</td>
                <td>
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" onClick={() => { props.getAction(props.pairdevice.type) }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Action
                </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {props.actions.map((value, index) => {
                                return <button className="btn btn-secondary dropdown-item" type="button" key={index} onClick={() => { this.performAction(props.pairdevice._id, value) }}>{value}</button>
                            })}
                        </div>
                    </div>
                </td>
                <td>
                    <Link className="btn btn-warning" to={"/update-pair-device/" + props.pairdevice._id}>Update</Link> <a href="/smart-devices" className="btn btn-danger" onClick={() => { props.deletePairDevice(props.pairdevice._id) }}>Delete</a>
                </td>
            </tr>
        )
    }
}