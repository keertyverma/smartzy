import React, { Component } from 'react';
import axios from 'axios';

export default class PairDevice extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeMac = this.onChangeMac.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            type: '',
            mac: '',
            deviceSupportedTypes: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:5000/api/v1/devicetype")
            .then(res => {
                if (res.data.details.length > 0) {
                    console.log("res.data.details", res.data.details)

                    this.setState({
                        deviceSupportedTypes: res.data.details.map(deviceType => deviceType._id)
                    })
                }
            })

    }


    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        })
    }

    onChangeMac(e) {
        this.setState({
            mac: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const deviceInfo = {
            name: this.state.name,
            type: this.state.type,
            mac: this.state.mac
        }

        console.log(deviceInfo);

        axios.post('http://localhost:5000/api/v1/device', deviceInfo)
            .then(res => {
                console.log(res.data)
                this.props.history.push('/smart-devices')

            })
            .catch((err) => alert(err.response.data.message));
    }

    render() {
        return (
            <div>
                <h3>Pair new Smart Device</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Device Type: </label>
                        <select ref="deviceTypeInput"
                            required
                            className="form-control"
                            value={this.state.type}
                            onChange={this.onChangeType}>
                            <option
                                key="default"
                                value="">Select
                            </option>;
                            {
                                this.state.deviceSupportedTypes.map(function (deviceType) {
                                    return <option
                                        key={deviceType}
                                        value={deviceType}>{deviceType}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>MAC Address: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.mac}
                            onChange={this.onChangeMac}
                        />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Pair Now" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}
