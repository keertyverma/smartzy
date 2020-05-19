import React, { Component } from 'react';
import axios from 'axios';

export default class EditDeviceType extends Component {
    constructor(props) {
        super(props);

        this.onChangeActions = this.onChangeActions.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            actions: ''
        }
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
            action: this.state.actions.split(",")
        }

        axios.put('http://localhost:5000/api/v1/devicetype/' + this.props.match.params.id, deviceInfo)
            .then(res => {
                console.log(res.data)
                this.props.history.push('/supported-devices')
            });
    }

    render() {
        return (
            <div>
                <h3>Update device type</h3>
                <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Update" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}