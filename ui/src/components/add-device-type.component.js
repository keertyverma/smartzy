import React, { Component } from 'react';
// import axios from '../utilities/client';
import axios from 'axios';

export default class AddDeviceType extends Component {
    constructor(props) {
        super(props);

        this.onChangeDeviceType = this.onChangeDeviceType.bind(this);
        this.onChangeActions = this.onChangeActions.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            deviceType: '',
            actions: ''
        }
    }

    onChangeDeviceType(e) {
        this.setState({
            deviceType: e.target.value
        })
    }

    onChangeActions(e) {
        this.setState({
            actions: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();


        // add new device types
        const deviceInfo = {
            type: this.state.deviceType,
            action: this.state.actions.split(",")
        }
        console.log("process.env.REACT_APP_BASE_URL", process.env.REACT_APP_BASE_URL)
        console.log(deviceInfo);

        axios.post('http://localhost:5000/api/v1/devicetype', deviceInfo)
            .then(res => console.log(res.data));

        this.setState({
            deviceType: '',
            actions: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Add new device type</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Device Type: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.deviceType}
                            onChange={this.onChangeDeviceType}
                        />
                    </div>
                    <div className="form-group">
                        <label>Actions </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.actions}
                            onChange={this.onChangeActions}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}