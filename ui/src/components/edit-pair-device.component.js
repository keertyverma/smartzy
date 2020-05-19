import React, { Component } from 'react';
import axios from 'axios';

export default class EditPairDevice extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const deviceInfo = {
            name: this.state.name
        }

        axios.put('http://localhost:5000/api/v1/device/' + this.props.match.params.id, deviceInfo)
            .then(res => {
                console.log(res.data)
                this.props.history.push('/smart-devices')

            })
            .catch((err) => alert(err.response.data.message));
    }

    render() {
        return (
            <div>
                <h3>Edit Paired Smart Device</h3>
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
                        <input type="submit" value="update" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}
